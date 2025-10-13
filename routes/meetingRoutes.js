const express = require("express");
const jwt = require("jsonwebtoken");
const transporter = require("../config/nodemailer");
const Meeting = require("../models/Meeting")

const router = express.Router();

const Frontend_URI = "http://localhost:5173"

// Protected middleware
const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "No token, unauthorized" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ msg: "Invalid token" });
    req.user = decoded;
    next();
  });
};

// Create & Invite
router.post("/invite", authMiddleware, async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ msg: "Email required" });

    // Generate unique meeting room link
    const roomId = Math.random().toString(36).substring(2, 10);
    const meetingLink = `${Frontend_URI}/meeting/${roomId}`;
    console.log(meetingLink)

    // Send invite email
    const mailOptions = {
      from: `"Zoom Clone" <${process.env.GOOGLE_APP_EMAIL}>`,
      to: email,
      subject: "You’re Invited to a Meeting 🚀",
      html: `
        <h2>Hello 👋,</h2>
        <p>You have been invited to join a meeting.</p>
        <p><strong>Meeting Link:</strong> <a href="${meetingLink}">${meetingLink}</a></p>
        <p>Click the link above to join the meeting at the scheduled time.</p>
        <br/>
        <p>— Team Zoom Clone</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.json({ msg: "Meeting invite sent successfully!", roomId, meetingLink });
  } catch (error) {
    console.error("❌ Error sending invite:", error);
    res.status(500).json({ msg: "Error sending invite", error: error.message });
  }
});

router.post("/schedule", authMiddleware, async (req, res) => {
  try {
    const { email, topic, description, date, time } = req.body;

    if (!email || !date || !time) {
      return res.status(400).json({ msg: "Email, date and time are required" });
    }

    // Generate unique meeting room link
    const roomId = Math.random().toString(36).substring(2, 10);
    const meetingLink = `${process.env.FRONTEND_URL}/meeting/${roomId}`;

    // Format meeting details
    const formattedDate = new Date(date + " " + time).toLocaleString();

    // Send invite email
    const mailOptions = {
      from: `"Zoom Clone" <${process.env.GOOGLE_APP_EMAIL}>`,
      to: email,
      subject: `📅 Meeting Scheduled: ${topic || "Zoom Clone Meeting"}`,
      html: `
        <h2>Hello 👋,</h2>
        <p>You have been invited to a scheduled meeting.</p>
        <p><strong>Topic:</strong> ${topic || "No topic provided"}</p>
        <p><strong>Description:</strong> ${description || "—"}</p>
        <p><strong>Date & Time:</strong> ${formattedDate}</p>
        <p><strong>Meeting Link:</strong> <a href="${meetingLink}">join here...</a></p>
        <br/>
        <p>— Team Zoom Clone</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.json({
      msg: "Meeting scheduled and invite sent!",
      roomId,
      meetingLink,
      topic,
      description,
      date,
      time,
    });
  } catch (error) {
    console.error("❌ Error scheduling meeting:", error);
    res.status(500).json({ msg: "Error scheduling meeting", error: error.message });
  }
});

router.get("/recent", authMiddleware, async (req, res) => {
  try {
    const meetings = await Meeting.find({ host: req.user.id })
      .sort({ createdAt: -1 })
      .limit(10);

    res.json(meetings);
  } catch (error) {
    console.error("❌ Error fetching recent meetings:", error);
    res.status(404).json({ msg: "Error fetching recent meetings", error: error.message });
  }
});

module.exports = router;
