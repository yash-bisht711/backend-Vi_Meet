// const express = require("express");
// const { v4: uuidv4 } = require("uuid");
// const Room = require("../models/Room");
// const auth = require("../middlewares/authMiddleware");

// const router = express.Router();

// // Create Room
// router.post("/create", auth, async (req, res) => {
//   try {
//     const roomId = uuidv4().slice(0, 8);
//     const room = await Room.create({
//       roomId,
//       owner: req.user._id,
//       participants: [req.user._id]
//     });
//     res.json({ roomId: room.roomId, room });
//   } catch (e) {
//     res.status(500).json({ message: e.message });
//   }
// });

// // Join Room
// router.post("/join", auth, async (req, res) => {
//   try {
//     const { roomId } = req.body;
//     const room = await Room.findOne({ roomId, active: true });
//     if (!room) return res.status(404).json({ message: "Room not found or inactive" });

//     const already = room.participants.find((p) => p.toString() === req.user._id.toString());
//     if (!already) {
//       room.participants.push(req.user._id);
//       await room.save();
//     }
//     res.json({ ok: true, roomId: room.roomId, room });
//   } catch (e) {
//     res.status(500).json({ message: e.message });
//   }
// });

// // Leave Room
// router.post("/leave", auth, async (req, res) => {
//   try {
//     const { roomId } = req.body;
//     const room = await Room.findOne({ roomId, active: true });
//     if (!room) return res.status(404).json({ message: "Room not found or inactive" });

//     room.participants = room.participants.filter((p) => p.toString() !== req.user._id.toString());
//     await room.save();
//     res.json({ ok: true });
//   } catch (e) {
//     res.status(500).json({ message: e.message });
//   }
// });

// // End Room (owner only)
// router.post("/end", auth, async (req, res) => {
//   try {
//     const { roomId } = req.body;
//     const room = await Room.findOne({ roomId });
//     if (!room) return res.status(404).json({ message: "Room not found" });
//     if (room.owner.toString() !== req.user._id.toString())
//       return res.status(403).json({ message: "Only owner can end the meeting" });

//     room.active = false;
//     await room.save();
//     res.json({ ok: true });
//   } catch (e) {
//     res.status(500).json({ message: e.message });
//   }
// });

// // Recent rooms for user
// router.get("/mine", auth, async (req, res) => {
//   const rooms = await Room.find({ participants: req.user._id })
//     .sort({ updatedAt: -1 })
//     .limit(10)
//     .lean();
//   res.json({ rooms });
// });

// module.exports = router;

const express = require("express");
const { v4: uuidv4 } = require("uuid");
const auth = require("../middlewares/auth");
const Room = require("../models/Room");
const transporter = require("../config/nodemailer");

const router = express.Router();

// create a room
router.post("/create", auth, async (req, res) => {
  try {
    const roomId = uuidv4().slice(0, 8);
    const room = await Room.create({ roomId, owner: req.user._id, participants: [req.user._id] });
    res.json({ roomId, room });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// join
router.post("/join", auth, async (req, res) => {
  try {
    const { roomId } = req.body || {};
    if (!roomId) return res.status(400).json({ message: "roomId required" });

    const room = await Room.findOne({ roomId, active: true });
    if (!room) return res.status(404).json({ message: "Room not found" });

    if (!room.participants.find(p => p.toString() === req.user._id.toString())) {
      room.participants.push(req.user._id);
      await room.save();
    }

    res.json({ ok: true, roomId });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// leave
router.post("/leave", auth, async (req, res) => {
  try {
    const { roomId } = req.body || {};
    const room = await Room.findOne({ roomId, active: true });
    if (room) {
      room.participants = room.participants.filter(p => p.toString() !== req.user._id.toString());
      await room.save();
    }
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// end (owner only)
router.post("/end", auth, async (req, res) => {
  try {
    const { roomId } = req.body || {};
    const room = await Room.findOne({ roomId });
    if (!room) return res.status(404).json({ message: "Room not found" });
    if (room.owner.toString() !== req.user._id.toString()) return res.status(403).json({ message: "Only owner can end" });

    room.active = false;
    await room.save();
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// my rooms
router.get("/mine", auth, async (req, res) => {
  try {
    const rooms = await Room.find({ participants: req.user._id }).sort({ updatedAt: -1 }).limit(20).lean();
    res.json({ rooms });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// invite by email
router.post("/invite", auth, async (req, res) => {
  const { email, roomId } = req.body;

  try {
    const meetingLink = `${process.env.CLIENT_URL}/meeting/${roomId}`;

    await transporter.sendMail({
      from: `"Meeting App" <${process.env.GOOGLE_APP_EMAIL}>`,
      to: email,
      subject: "You are invited to a Meeting",
      html: `<p>You have been invited to a meeting.</p>
             <p>Join here: <a href="${meetingLink}">Join Meeting</a></p>`
    });

    res.json({ msg: "Meeting invite sent." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to send invite." });
  }
});

module.exports = router;
