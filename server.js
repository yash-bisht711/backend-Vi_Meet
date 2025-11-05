const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
//const cors = require("cors");

const roomRoutes = require("./routes/roomRoutes");
const protectedRoutes = require("./routes/protectedRoutes");
const chatRoutes = require("./routes/chatRoutes");
const authRoutes = require("./routes/authRoutes")
const meetingRoutes = require("./routes/meetingRoutes");
const initSocket = require("./socket");
const connectDB = require("./config/db")
const app = express();
//app.use(cors({ origin: true, credentials: true }));

const allowedOrigins = [
  "http://localhost:5173",
  "https://vi-meet-1c0480.netlify.app"
];

app.use(require("cors")({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());

connectDB()

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/protected", protectedRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/meetings", meetingRoutes);

app.get("/", (_req, res) => res.send("Video Chat Backend Running..."));

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

// 🔌 Initialize Socket.IO
initSocket(server);

server.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
