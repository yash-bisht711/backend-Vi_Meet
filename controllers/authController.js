// const bcrypt = require("bcryptjs"); // you can also use 'bcrypt' (native)
// const jwt = require("jsonwebtoken");
// const User = require("../models/User");
// const nodemailer = require("nodemailer");

// const JWT_SECRET = process.env.JWT_SECRET || "supersecretjwt";

// // ✅ Utility: create JWT
// const createToken = (user) =>
//   jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
//     expiresIn: "1d",
//   });

// // ------------------ SIGNUP ------------------
// // exports.signup = async (req, res) => {
// //   try {
// //     let { name, email, password } = req.body;

// //     if (!name || !email || !password) {
// //       return res.status(400).json({ message: "All fields are required" });
// //     }

// //     email = email.trim().toLowerCase();
// //     const existingUser = await User.findOne({ email });
// //     if (existingUser) {
// //       return res.status(400).json({ message: "User already exists" });
// //     }

// //     const hashedPassword = await bcrypt.hash(password, 10);
// //     const user = new User({
// //       name,
// //       email,
// //       password: hashedPassword,
// //     });
// //     await user.save();

// //     const token = createToken(user);
// //     res.status(201).json({
// //       token,
// //       user: { id: user._id, name: user.name, email: user.email },
// //     });
// //   } catch (err) {
// //     console.error("Signup error:", err);
// //     res.status(500).json({ error: err.message || "Server error" });
// //   }
// // };

// exports.signup = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     let user = await User.findOne({ email });
//     if (user) return res.status(400).json({ msg: "User already exists" });

//     // hash password before saving
//     const hashedPassword = await bcrypt.hash(password, 10);
//     console.log(await bcrypt.compare(password,hashedPassword))
//     user = new User({
//       name,
//       email,
//       password: hashedPassword,
//     });

//     await user.save();

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });

//     res.json({
//       token,
//       user: { id: user._id, name: user.name, email: user.email },
//     });
//   } catch (err) {
//     res.status(500).json({ msg: err.message });
//   }
// };

// // ------------------ LOGIN ------------------
// // exports.login = async (req, res) => {
// //   try {
// //     const { email, password } = req.body;

// //     if (!email?.trim() || !password) {
// //       return res.status(400).json({ message: "Email and password required" });
// //     }

// //     const emailNew = email.trim().toLowerCase();
// //     const user = await User.findOne({ email: emailNew });
// //     console.log(email,password,user)
// //     if (!user) {
// //       return res.status(400).json({ message: "Invalid email credentials" });
// //     }

// //     // ✅ FIXED: plain password first, hashed password second
// //     const match = await bcrypt.compare(password, user.password);
// //     if (!match) {
// //       return res.status(401).json({ msg: "Invalid credentials" });
// //     }

// //     const token = createToken(user);

// //     res.json({
// //       token,
// //       user: { id: user._id, name: user.name, email: user.email },
// //     });
// //   } catch (err) {
// //     console.error("Login error:", err);
// //     res.status(500).json({ error: err.message || "Server error" });
// //   }
// // };

// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // check user
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ msg: "Invalid credentials" });

//     // compare password
//     console.log("Entered Password:", password);
//     console.log("Stored Password (hashed):", user.password);
//     const isMatch = await bcrypt.compare(password, user.password);
//     console.log("isMatch:", isMatch);

//     if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

//     // sign JWT
//     const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
//       expiresIn: "1h",
//     });

//     res.json({
//       token,
//       user: { id: user._id, name: user.name, email: user.email },
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ msg: "Server error" });
//   }
// };

// // ------------------ FORGOT PASSWORD ------------------
// exports.forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;
//     if (!email?.trim()) {
//       return res.status(400).json({ message: "Email required" });
//     }

//     const user = await User.findOne({ email: email.trim().toLowerCase() });
//     if (!user) {
//       return res.status(400).json({ message: "No account with that email" });
//     }

//     const resetToken = jwt.sign({ id: user._id }, JWT_SECRET, {
//       expiresIn: "15m",
//     });

//     // Example Nodemailer transporter (configure with real SMTP)
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     const resetUrl = `http://localhost:5173/reset-password?token=${resetToken}`;
//     await transporter.sendMail({
//       to: user.email,
//       subject: "Password Reset",
//       html: `<p>Click <a href="${resetUrl}">here</a> to reset your password. Link expires in 15 minutes.</p>`,
//     });

//     res.json({ message: "Reset email sent" });
//   } catch (err) {
//     console.error("ForgotPassword error:", err);
//     res.status(500).json({ error: err.message || "Server error" });
//   }
// };

// // ------------------ RESET PASSWORD ------------------
// exports.resetPassword = async (req, res) => {
//   try {
//     const { token, newPassword } = req.body;
//     if (!token || !newPassword) {
//       return res.status(400).json({ message: "Token and password required" });
//     }

//     const decoded = jwt.verify(token, JWT_SECRET);
//     const user = await User.findById(decoded.id);
//     if (!user) {
//       return res.status(400).json({ message: "Invalid token" });
//     }

//     user.password = await bcrypt.hash(newPassword, 10);
//     await user.save();

//     res.json({ message: "Password reset successful" });
//   } catch (err) {
//     console.error("ResetPassword error:", err);
//     res.status(500).json({ error: err.message || "Server error" });
//   }
// };

// // ------------------ VERIFY TOKEN (Middleware) ------------------
// exports.verifyToken = (req, res, next) => {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];
//   if (!token) return res.status(401).json({ message: "Access denied" });

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     req.user = decoded; // attach user to request
//     next();
//   } catch (err) {
//     res.status(401).json({ message: "Invalid token" });
//   }
// };

const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const transporter = require("../config/nodemailer");

require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;
const FRONTEND_URL = process.env.FRONTEND_URL;
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS) || 10;

// ---------------- SIGNUP ----------------
exports.signup = async (req, res) => {
  try {
    let { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ msg: "All fields are required" });

    email = email.trim().toLowerCase();
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await User.create({ name, email, password: hashedPassword });

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "1d" });

    // Send welcome email
    try {
      await transporter.sendMail({
        from: `"VideoChat" <${process.env.BREVO_USER}>`,
        to: user.email,
        subject: "Welcome to VideoChat 🎉",
        html: `<h2>Welcome, ${user.name}!</h2>
               <p>Your account has been created successfully. Enjoy VideoChat 🚀</p>`
      });
    } catch (err) {
      console.error("Signup email error:", err.message);
    }

    res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email } });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// ---------------- LOGIN ----------------
exports.login = async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ msg: "Email and password required" });

    email = email.trim().toLowerCase();
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "1d" });
    res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email } });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// ---------------- FORGOT PASSWORD ----------------
exports.forgotPassword = async (req, res) => {
  try {
    let { email } = req.body;
    if (!email) return res.status(400).json({ msg: "Email required" });

    email = email.trim().toLowerCase();
    const user = await User.findOne({ email });
    if (!user) return res.json({ msg: "If the email exists, a reset link has been sent" });

    const resetToken = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "15m" });
    const resetLink = `${FRONTEND_URL}/reset-password/${resetToken}`;

    await transporter.sendMail({
      from: `"VideoChat" <${process.env.BREVO_USER}>`,
      to: user.email,
      subject: "Reset your password 🔑",
      html: `<p>Click the link to reset your password (valid for 15 min): <a href="${resetLink}">Reset Password</a></p>`
    });

    res.json({ msg: "If the email exists, a reset link has been sent" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// ---------------- RESET PASSWORD ----------------
exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!token || !password)
      return res.status(400).json({ msg: "Token and new password required" });

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ msg: "Password reset successfully" });

  } catch (err) {
    console.error(err);
    res.status(400).json({ msg: "Invalid or expired token" });
  }
};



