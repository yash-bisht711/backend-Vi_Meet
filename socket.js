// const { Server } = require("socket.io");
// const jwt = require("jsonwebtoken");
// const Room = require("./models/Room");
// const Message = require("./models/Message");
// const User = require("./models/User");

// const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// // roomId -> { sockets: Set<socketId>, users: Map<socketId, userId> }
// const roomsState = new Map();

// module.exports = function initSocket(server) {
//   const io = new Server(server, {
//     cors: { origin: true, credentials: true }
//   });

//   io.use((socket, next) => {
//     try {
//       const token =
//         socket.handshake.auth?.token ||
//         socket.handshake.headers?.authorization?.replace("Bearer ", "");
//       if (!token) return next(new Error("NO_AUTH"));
//       const decoded = jwt.verify(token, JWT_SECRET);
//       socket.userId = decoded.id;
//       next();
//     } catch (e) {
//       next(new Error("BAD_AUTH"));
//     }
//   });

//   io.on("connection", (socket) => {
//     socket.on("room:join", async ({ roomId }) => {
//       const user = await User.findById(socket.userId).select("name email");
//       const room = await Room.findOne({ roomId, active: true });
//       if (!room) return socket.emit("room:error", { message: "Room not found or inactive" });

//       socket.join(roomId);

//       if (!roomsState.has(roomId)) roomsState.set(roomId, { sockets: new Set(), users: new Map() });
//       const state = roomsState.get(roomId);
//       state.sockets.add(socket.id);
//       state.users.set(socket.id, socket.userId);

//       // Existing peers to newcomer (newcomer will create offers to them)
//       const existing = [...state.sockets].filter((id) => id !== socket.id);
//       socket.emit("room:peers", { peers: existing });

//       // Notify others about this new peer (they will wait for our offers)
//       socket.to(roomId).emit("peer:join", {
//         socketId: socket.id,
//         user: { id: user._id, name: user.name }
//       });

//       // Optional: participant list broadcast
//       const participants = await Room.findOne({ roomId }).populate("participants", "name email");
//       io.to(roomId).emit("room:participants", {
//         participants: participants?.participants || []
//       });
//     });

//     // Signaling
//     socket.on("webrtc:offer", ({ roomId, to, sdp }) => {
//       io.to(to).emit("webrtc:offer", { from: socket.id, sdp });
//     });

//     socket.on("webrtc:answer", ({ roomId, to, sdp }) => {
//       io.to(to).emit("webrtc:answer", { from: socket.id, sdp });
//     });

//     socket.on("webrtc:ice", ({ roomId, to, candidate }) => {
//       io.to(to).emit("webrtc:ice", { from: socket.id, candidate });
//     });

//     // Chat
//     socket.on("chat:send", async ({ roomId, message }) => {
//       const msg = await Message.create({ roomId, sender: socket.userId, message });
//       const populated = await msg.populate({ path: "sender", select: "name email" });
//       io.to(roomId).emit("chat:new", {
//         _id: msg._id,
//         roomId,
//         sender: populated.sender,
//         message: msg.message,
//         timestamp: msg.createdAt
//       });
//     });

//     const leaveAllRooms = async () => {
//       const joined = [...socket.rooms].filter((r) => r !== socket.id);
//       for (const roomId of joined) {
//         socket.leave(roomId);
//         const state = roomsState.get(roomId);
//         if (state) {
//           state.sockets.delete(socket.id);
//           state.users.delete(socket.id);
//           if (state.sockets.size === 0) roomsState.delete(roomId);
//         }
//         socket.to(roomId).emit("peer:leave", { socketId: socket.id });
//       }
//     };

//     socket.on("room:leave", leaveAllRooms);
//     socket.on("disconnect", leaveAllRooms);
//   });
// };

const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const Message = require("./models/Message");
const Room = require("./models/Room");
const User = require("./models/User");

module.exports = function initSocket(server) {
  const io = new Server(server, { cors: { origin: true, credentials: true } });

  // simple in-memory state
  const states = new Map(); // roomId -> { sockets: Set, users: Map(socketId->userId) }

  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth?.token || socket.handshake.headers?.authorization?.replace("Bearer ", "");
      if (!token) return next(new Error("NO_TOKEN"));
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = decoded.id;
      next();
    } catch (e) {
      next(new Error("UNAUTHORIZED"));
    }
  });

  io.on("connection", (socket) => {
    // join room
    socket.on("room:join", async ({ roomId }) => {
      try {
        const room = await Room.findOne({ roomId, active: true });
        if (!room) return socket.emit("room:error", { message: "Room not found" });

        socket.join(roomId);

        if (!states.has(roomId)) states.set(roomId, { sockets: new Set(), users: new Map() });
        const st = states.get(roomId);
        st.sockets.add(socket.id);
        st.users.set(socket.id, socket.userId);

        // send peers to newcomer
        const existing = [...st.sockets].filter(id => id !== socket.id);
        socket.emit("room:peers", { peers: existing });

        // notify others
        socket.to(roomId).emit("peer:join", { socketId: socket.id });

        // optional participant broadcast (updated list)
        const populated = await Room.findOne({ roomId }).populate("participants", "name email");
        io.to(roomId).emit("room:participants", { participants: populated?.participants || [] });
      } catch (e) {
        socket.emit("room:error", { message: e.message });
      }
    });

    // signaling
    socket.on("webrtc:offer", ({ roomId, to, sdp }) => { io.to(to).emit("webrtc:offer", { from: socket.id, sdp }); });
    socket.on("webrtc:answer", ({ roomId, to, sdp }) => { io.to(to).emit("webrtc:answer", { from: socket.id, sdp }); });
    socket.on("webrtc:ice", ({ roomId, to, candidate }) => { io.to(to).emit("webrtc:ice", { from: socket.id, candidate }); });

    // chat
    socket.on("chat:send", async ({ roomId, message }) => {
      try {
        const msg = await Message.create({ roomId, sender: socket.userId, message });
        const populated = await msg.populate("sender", "name email");
        io.to(roomId).emit("chat:new", { _id: msg._id, roomId, sender: populated.sender, message: msg.message, timestamp: msg.createdAt });
      } catch (e) {
        console.error("chat send error", e);
      }
    });

    // leave handler
    const leaveAll = () => {
      const rooms = [...socket.rooms].filter(r => r !== socket.id);
      for (const roomId of rooms) {
        socket.leave(roomId);
        const st = states.get(roomId);
        if (st) {
          st.sockets.delete(socket.id);
          st.users.delete(socket.id);
          if (st.sockets.size === 0) states.delete(roomId);
        }
        socket.to(roomId).emit("peer:leave", { socketId: socket.id });
      }
    };

    socket.on("room:leave", leaveAll);
    socket.on("disconnect", leaveAll);
  });
};
