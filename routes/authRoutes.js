// const express = require("express");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require("../models/User");
// const transporter = require("../config/nodemailer"); // your configured Nodemailer transporter

// const router = express.Router();
// const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// // -------------------- SIGNUP --------------------
// router.post("/signup", async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     if (!name?.trim() || !email?.trim() || !password?.trim()) {
//       return res.status(400).json({ message: "All fields required" });
//     }

//     const existing = await User.findOne({ email });
//     if (existing) return res.status(400).json({ message: "User already exists" });

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await User.create({ name, email, password: hashedPassword });

//     // Optional: send welcome email
//     if (transporter) {
//       await transporter.sendMail({
//         from: `"VideoChatPro" <${process.env.EMAIL_USER}>`,
//         to: user.email,
//         subject: "Welcome to VideoChatPro",
//         html: `<p>Hi ${user.name},</p><p>Welcome! Your account was created successfully.</p>`,
//       });
//     }

//     res.json({ message: "Signup successful" });
//   } catch (err) {
//     console.error("Signup error:", err);
//     res.status(500).json({ error: err.message || "Server error" });
//   }
// });

// // -------------------- LOGIN --------------------
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email?.trim() || !password) {
//       return res.status(400).json({ message: "Email and password required" });
//     }
//     console.log(email,password)

//     const user = await User.findOne({ email: email.trim().toLowerCase() });
//     if (!user) return res.status(400).json({ message: "Invalid email credentials" });
//     console.log(user)

//     const isMatch = await bcrypt.compare(password, user.password);
//     console.log(isMatch)
//     if (!isMatch) return res.status(400).json({ message: "Invalid password credentials" });
    
//     const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "1d" });
//     res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
//   } catch (err) {
//     console.error("Login error:", err);
//     res.status(500).json({ error: err.message || "Server error" });
//   }
// });

// // -------------------- FORGOT PASSWORD --------------------
// router.post("/forgot-password", async (req, res) => {
//   const { email } = req.body;
//   if (!email?.trim()) return res.status(400).json({ msg: "Email is required" });

//   try {
//     const user = await User.findOne({ email: email.trim() });
//     if (!user) return res.status(404).json({ msg: "User not found" });

//     const resetToken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "20m" });
//     const resetLink = `http://localhost:5173/reset-password?token=${resetToken}`;

//     if (!transporter) {
//       console.warn("No mail transporter configured; not sending reset email.");
//       return res.json({ msg: "Reset link (dev): " + resetLink });
//     }

//     await transporter.sendMail({
//       from: process.env.EMAIL_FROM || `VideoChatPro Support <${process.env.EMAIL_USER}>`,
//       to: user.email,
//       subject: "Password Reset",
//       html: `<p>Hello ${user.name},</p>
//              <p>Click the link below to reset your password (valid for 20 minutes):</p>
//              <p><a href="${resetLink}">Reset Link</a></p>`,
//     });

//     res.json({ msg: "Reset link sent to email" });
//   } catch (err) {
//     console.error("Forgot password error:", err);
//     res.status(500).json({ msg: "Failed to send email", error: err.message });
//   }
// });

// // -------------------- RESET PASSWORD --------------------
// router.post("/reset-password", async (req, res) => {
//   const token = req.query?.token || req.body?.token;
//   const newPassword = req.body?.newPassword;

//   if (!token) return res.status(400).json({ msg: "Reset token required" });
//   if (!newPassword || !newPassword.trim()) return res.status(400).json({ msg: "New password required" });

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     const userId = decoded.userId;
//     if (!userId) return res.status(400).json({ msg: "Invalid token payload" });

//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ msg: "User not found" });

//     const hashed = await bcrypt.hash(newPassword, saltRounds);
//     user.password = hashed;
//     await user.save();

//     res.json({ msg: "Password reset successful" });
//   } catch (err) {
//     console.error("Reset password error:", err);
//     if (err.name === "TokenExpiredError") {
//       res.status(403).json({ msg: "Reset link expired. Please try again." });
//     } else {
//       res.status(500).json({ msg: "Reset failed", error: err.message });
//     }
//   }
// });

// // router.post("/reset-password", async (req, res) => {
// //   try {
// //     const { token, newPassword } = req.body;

// //     if (!token || !newPassword) {
// //       return res.status(400).json({ msg: "Token and new password are required" });
// //     }

// //     // Find user by token (you should have saved token and expiry in DB)
// //     const user = await User.findOne({ resetPasswordToken: token });

// //     if (!user) {
// //       return res.status(400).json({ msg: "Invalid or expired token" });
// //     }

// //     // Update password
// //     const salt = await bcrypt.genSalt(10);
// //     user.password = await bcrypt.hash(newPassword, salt);

// //     // Clear reset token
// //     user.resetPasswordToken = null;
// //     user.resetPasswordExpires = null;

// //     await user.save();

// //     res.json({ msg: "Password has been reset successfully" });
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ msg: "Server error" });
// //   }
// // });

// module.exports = router;

//.........................................................................................................

// const express = require("express");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require("../models/User");
// const transporter = require("../config/nodemailer"); // your Nodemailer transporter
//require("dotenv").config()
// const router = express.Router();
// const JWT_SECRET = process.env.JWT_SECRET;
// const saltRounds = 10; // for bcrypt

// // -------------------- SIGNUP --------------------
// router.post("/signup", async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     if (!name?.trim() || !email?.trim() || !password?.trim()) {
//       return res.status(400).json({ message: "All fields required" });
//     }

//     const existing = await User.findOne({ email: email.trim().toLowerCase() });
//     if (existing) return res.status(400).json({ message: "User already exists" });

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);
//     console.log(await bcrypt.compare(password,hashedPassword))

//     // Create user
//     const user = await User.create({ name, email: email.trim().toLowerCase(), password: hashedPassword });

//     // Generate JWT token immediately
//     const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "1d" });

//     res.json({
//       message: "Signup successful",
//       token,
//       user: { id: user._id, name: user.name, email: user.email },
//     });

//   } catch (err) {
//     console.error("Signup error:", err);
//     res.status(500).json({ error: err.message || "Server error" });
//   }
// });
// // -------------------- LOGIN --------------------
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email?.trim() || !password) {
//       return res.status(400).json({ message: "Email and password required" });
//     }

//     const normalizedEmail = email.trim().toLowerCase();
//     const user = await User.findOne({ email: normalizedEmail });
//     if (!user) return res.status(400).json({ message: "Invalid email credentials" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     console.log(isMatch,email,password,user)
//     if (!isMatch) return res.status(400).json({ message: "Invalid password credentials" });

//     const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "1d" });
//     res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
//   } catch (err) {
//     console.error("Login error:", err);
//     res.status(500).json({ error: err.message || "Server error" });
//   }
// });

// // -------------------- FORGOT PASSWORD --------------------
// router.post("/forgot-password", async (req, res) => {
//   try {
//     const { email } = req.body;
//     if (!email?.trim()) return res.status(400).json({ msg: "Email is required" });

//     const normalizedEmail = email.trim().toLowerCase();
//     const user = await User.findOne({ email: normalizedEmail });
//     if (!user) return res.status(404).json({ msg: "User not found" });

//     const resetToken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "20m" });
//     const resetLink = `http://localhost:5173/reset-password?token=${resetToken}`;

//     if (!transporter) {
//       console.warn("No mail transporter configured; not sending reset email.");
//       return res.json({ msg: "Reset link (dev): " + resetLink });
//     }

//     await transporter.sendMail({
//       from: process.env.EMAIL_FROM || `VideoChatPro Support <${process.env.EMAIL_USER}>`,
//       to: user.email,
//       subject: "Password Reset",
//       html: `<p>Hello ${user.name},</p>
//              <p>Click the link below to reset your password (valid for 20 minutes):</p>
//              <p><a href="${resetLink}">Reset Link</a></p>`,
//     });

//     res.json({ msg: "Reset link sent to email" });
//   } catch (err) {
//     console.error("Forgot password error:", err);
//     res.status(500).json({ msg: "Failed to send email", error: err.message });
//   }
// });

// // -------------------- RESET PASSWORD --------------------
// router.post("/reset-password", async (req, res) => {
//   try {
//     const token = req.body?.token || req.query?.token;
//     const newPassword = req.body?.newPassword;

//     if (!token) return res.status(400).json({ msg: "Reset token required" });
//     if (!newPassword?.trim()) return res.status(400).json({ msg: "New password required" });

//     const decoded = jwt.verify(token, JWT_SECRET);
//     const userId = decoded.userId;
//     if (!userId) return res.status(400).json({ msg: "Invalid token payload" });

//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ msg: "User not found" });

//     const hashed = await bcrypt.hash(newPassword, saltRounds);
//     user.password = hashed;
//     await user.save();

//     res.json({ msg: "Password reset successful" });
//   } catch (err) {
//     console.error("Reset password error:", err);
//     if (err.name === "TokenExpiredError") {
//       res.status(403).json({ msg: "Reset link expired. Please try again." });
//     } else {
//       res.status(500).json({ msg: "Reset failed", error: err.message });
//     }
//   }
// });

// module.exports = router;

//..................................................................

// const express = require("express");
// const router = express.Router();
// const {
//   forgotPassword,
//   resetPassword,
//   signup,
//   login,
// } = require("../controllers/authController");

// router.post("/signup", signup);
// router.post("/login", login);
// router.post("/forgot-password", forgotPassword);
// router.post("/reset-password", resetPassword);

// module.exports = router;

//...........................................................................................

// const express = require("express");
// const router = express.Router();
// const User = require("../models/User");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const transporter = require("../config/nodemailer");
// require("dotenv").config();

// const JWT_SECRET = process.env.JWT_SECRET || "supersecretjwt";

// // ------------------ SIGNUP ------------------
// router.post("/signup", async (req, res) => {
//   try {
//     let { name, email, password } = req.body;
//     if (!name || !email || !password) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     email = email.trim().toLowerCase();
//     const existingUser = await User.findOne({ email });
//     if (existingUser) return res.status(400).json({ message: "User exists" });

//     const hashedPassword = await bcrypt.hash(password, 10); // Hash here
//     const user = new User({ name, email, password: hashedPassword });
//     await user.save();

//     const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "1d" });

//     res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email } });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // ------------------ LOGIN ------------------
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) return res.status(400).json({ message: "Email and password required" });

//     const user = await User.findOne({ email: email.trim().toLowerCase() });
//     if (!user) return res.status(400).json({ message: "Invalid credentials" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

//     const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "1d" });

//     res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// router.post("/forgot-password", async (req, res) => {
//   const { email } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ msg: "User not found" });

//     // create reset token (JWT valid for 15 min)
//     const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "15m" });

//     const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

//     await transporter.sendMail({
//       from: `"Meeting App" <${process.env.GOOGLE_APP_EMAIL}>`,
//       to: user.email,
//       subject: "Reset Your Password",
//       html: `<p>Click the link to reset your password: <a href="${resetLink}">Reset Password</a></p>`
//     });

//     res.json({ msg: "Password reset link sent to your email." });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ msg: "Server error" });
//   }
// });

// // RESET PASSWORD
// router.post("/reset-password/:token", async (req, res) => {
//   const { token } = req.params;
//   const { password } = req.body;

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.id);
//     if (!user) return res.status(404).json({ msg: "User not found" });

//     const hashedPassword = await bcrypt.hash(password, 10);
//     user.password = hashedPassword;
//     await user.save();

//     res.json({ msg: "Password reset successfully." });
//   } catch (err) {
//     console.error(err);
//     res.status(400).json({ msg: "Invalid or expired token" });
//   }
// });

// module.exports = router;

//......................................................................................//

const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const transporter = require("../config/nodemailer");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET || "supersecretjwt";

// ------------------ SIGNUP ------------------
router.post("/signup", async (req, res) => {
  try {
    let { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    email = email.trim().toLowerCase();
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "1d" });

    // ----------------- Send Welcome Email -----------------
    try {
      if (transporter) {
        await transporter.sendMail({
          from: `"Meeting App" <${process.env.GOOGLE_APP_EMAIL}>`,
          to: user.email,
          subject: "Welcome to Meeting App 🎉",
          html: `
            <h2>Welcome, ${user.name}!</h2>
            <p>Thank you for signing up for <b>Meeting App</b>.</p>
            <p>Your account has been created successfully. You can now log in and start using our features 🚀</p>
            <br/>
            <p>Best regards,</p>
            <p><b>Meeting App Team</b></p>
          `,
        });
      }
    } catch (mailErr) {
      console.error("Signup email error:", mailErr.message);
      // don’t fail signup if email fails
    }

    res.status(201).json({
      message: "Signup successful. Welcome email sent!",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ------------------ LOGIN ------------------
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password required" });

    const user = await User.findOne({ email: email.trim().toLowerCase() });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "1d" });

    res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ------------------ FORGOT PASSWORD ------------------
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "15m" });
    const resetLink = `https://vi-meet-1c0480.netlify.app/reset-password/${resetToken}`;

    await transporter.sendMail({
      from: `"Meeting App" <${process.env.GOOGLE_APP_EMAIL}>`,
      to: user.email,
      subject: "Reset Your Password",
      html: `<p>Click the link to reset your password: <a href="${resetLink}">Reset Password</a></p>`
    });

    res.json({ msg: "Password reset link sent to your email." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ------------------ RESET PASSWORD ------------------
router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ msg: "Password reset successfully." });
  } catch (err) {
    console.error(err);
    res.status(400).json({ msg: "Invalid or expired token" });
  }
});

module.exports = router;




