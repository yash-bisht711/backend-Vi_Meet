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




