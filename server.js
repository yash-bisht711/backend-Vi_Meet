  // // // // const express = require("express");
  // // // // const http = require("http");
  // // // // const mongoose = require("mongoose");
  // // // // //const cors = require("cors");

  // // // // const roomRoutes = require("./routes/roomRoutes");
  // // // // const protectedRoutes = require("./routes/protectedRoutes");
  // // // // const chatRoutes = require("./routes/chatRoutes");
  // // // // const authRoutes = require("./routes/authRoutes")
  // // // // const meetingRoutes = require("./routes/meetingRoutes");
  // // // // const initSocket = require("./socket");
  // // // // const connectDB = require("./config/db")
  // // // // const app = express();
  // // // // //app.use(cors({ origin: true, credentials: true }));

  // // // // const allowedOrigins = [
  // // // //   "http://localhost:5173",
  // // // //   "https://vi-meet-1c0480.netlify.app"
  // // // // ];

  // // // // app.use(require("cors")({
  // // // //   origin: allowedOrigins,
  // // // //   credentials: true
  // // // // }));

  // // // // app.use(express.json());

  // // // // connectDB()

  // // // // // Routes
  // // // // app.use("/api/auth", authRoutes);
  // // // // app.use("/api/rooms", roomRoutes);
  // // // // app.use("/api/protected", protectedRoutes);
  // // // // app.use("/api/chat", chatRoutes);
  // // // // app.use("/api/meetings", meetingRoutes);

  // // // // app.get("/", (_req, res) => res.send("Video Chat Backend Running..."));
  // // // // app.get("/test-email", async (req, res) => {
  // // // //   try {
  // // // //     await transporter.sendMail({
  // // // //       from: process.env.BREVO_USER,
  // // // //       to: "your_email@gmail.com",
  // // // //       subject: "✅ Brevo SMTP Working!",
  // // // //       text: "Your backend can now send emails successfully!"
  // // // //     });
  // // // //     res.send("✅ Email Sent Successfully!");
  // // // //   } catch (error) {
  // // // //     console.log(error);
  // // // //     res.send("❌ Failed to send email");
  // // // //   }
  // // // // });

  // // // // const PORT = process.env.PORT || 5000;
  // // // // const server = http.createServer(app);

  // // // // // 🔌 Initialize Socket.IO
  // // // // initSocket(server);

  // // // // server.listen(PORT, () =>
  // // // //   console.log(`🚀 Server running on http://localhost:${PORT}`)
  // // // // );

  // // // const express = require("express");
  // // // const http = require("http");
  // // // const mongoose = require("mongoose");
  // // // const connectDB = require("./config/db");
  // // // const transporter = require("./config/nodemailer")

  // // // const roomRoutes = require("./routes/roomRoutes");
  // // // const protectedRoutes = require("./routes/protectedRoutes");
  // // // const chatRoutes = require("./routes/chatRoutes");
  // // // const authRoutes = require("./routes/authRoutes");
  // // // const meetingRoutes = require("./routes/meetingRoutes");
  // // // const initSocket = require("./socket");

  // // // const app = express();

  // // // const allowedOrigins = [
  // // //   "http://localhost:5173",
  // // //   "https://vi-meet-1c0480.netlify.app"
  // // // ];

  // // // app.use(require("cors")({
  // // //   origin: allowedOrigins,
  // // //   credentials: true
  // // // }));

  // // // app.use(express.json());

  // // // connectDB();

  // // // // Routes
  // // // app.use("/api/auth", authRoutes);
  // // // app.use("/api/rooms", roomRoutes);
  // // // app.use("/api/protected", protectedRoutes);
  // // // app.use("/api/chat", chatRoutes);
  // // // app.use("/api/meetings", meetingRoutes);

  // // // // Root
  // // // app.get("/", (_req, res) => res.send("Video Chat Backend Running..."));

  // // // // ------------------- Test Email Route -------------------
  // // // app.get("/test-email", async (req, res) => {
  // // //   try {
  // // //     await transporter.sendMail({
  // // //       from: `"VideoChat" <${process.env.BREVO_USER}>`,
  // // //       to: "your_email@gmail.com", // 🔹 replace with your actual email
  // // //       subject: "✅ Brevo SMTP Working!",
  // // //       text: "Your backend can now send emails successfully!"
  // // //     });
  // // //     res.send("✅ Email Sent Successfully! Check your inbox.");
  // // //   } catch (error) {
  // // //     console.error("❌ Test email failed:", error);
  // // //     res.status(500).send("❌ Failed to send email: " + error.message);
  // // //   }
  // // // });

  // // // const PORT = process.env.PORT || 5000;
  // // // const server = http.createServer(app);

  // // // // 🔌 Initialize Socket.IO
  // // // initSocket(server);

  // // // server.listen(PORT, () => {
  // // //   console.log(`🚀 Server running on http://localhost:${PORT}`);
  // // // });

  // // const express = require("express");
  // // const http = require("http");
  // // const connectDB = require("./config/db");
  // // const emailClient = require("./config/nodemailer"); // Brevo SDK client
  // // const SibApiV3Sdk = require("sib-api-v3-sdk"); // required for SendSmtpEmail object

  // // const roomRoutes = require("./routes/roomRoutes");
  // // const protectedRoutes = require("./routes/protectedRoutes");
  // // const chatRoutes = require("./routes/chatRoutes");
  // // const authRoutes = require("./routes/authRoutes");
  // // const meetingRoutes = require("./routes/meetingRoutes");
  // // const initSocket = require("./socket");

  // // const app = express();

  // // const allowedOrigins = [
  // //   "http://localhost:5173",
  // //   "https://vi-meet-1c0480.netlify.app"
  // // ];

  // // app.use(require("cors")({
  // //   origin: allowedOrigins,
  // //   credentials: true
  // // }));

  // // app.use(express.json());

  // // connectDB();

  // // // Routes
  // // app.use("/api/auth", authRoutes);
  // // app.use("/api/rooms", roomRoutes);
  // // app.use("/api/protected", protectedRoutes);
  // // app.use("/api/chat", chatRoutes);
  // // app.use("/api/meetings", meetingRoutes);

  // // // Root
  // // app.get("/", (_req, res) => res.send("Video Chat Backend Running..."));

  // // // ------------------- Test Email Route -------------------
  // // app.get("/test-email", async (req, res) => {
  // //   const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail({
  // //     to: [{ email: "your_email@gmail.com" }], // 🔹 replace with your actual email
  // //     sender: { email: process.env.BREVO_USER, name: "VideoChat" },
  // //     subject: "✅ Brevo SDK Working!",
  // //     textContent: "Your backend can now send emails successfully!"
  // //   });

  // //   try {
  // //     const data = await emailClient.sendTransacEmail(sendSmtpEmail);
  // //     console.log("✅ Email sent successfully:", data);
  // //     res.send("✅ Email Sent Successfully! Check your inbox.");
  // //   } catch (error) {
  // //     console.error("❌ Test email failed:", error);
  // //     res.status(500).send("❌ Failed to send email: " + error.message);
  // //   }
  // // });

  // // const PORT = process.env.PORT || 5000;
  // // const server = http.createServer(app);

  // // // 🔌 Initialize Socket.IO
  // // initSocket(server);

  // // server.listen(PORT, () => {
  // //   console.log(`🚀 Server running on http://localhost:${PORT}`);
  // // });

  // // server.js
  // require("dotenv").config();
  // const express = require("express");
  // const http = require("http");
  // const mongoose = require("mongoose");
  // const SibApiV3Sdk = require("sib-api-v3-sdk");
  // const initSocket = require("./socket");

  // // Routes
  // const authRoutes = require("./routes/authRoutes");
  // const roomRoutes = require("./routes/roomRoutes");
  // const chatRoutes = require("./routes/chatRoutes");
  // const protectedRoutes = require("./routes/protectedRoutes");
  // const meetingRoutes = require("./routes/meetingRoutes");

  // // ------------------- Express Setup -------------------
  // const app = express();
  // app.use(express.json());

  // const allowedOrigins = [
  //   "http://localhost:5173",
  //   "https://vi-meet-1c0480.netlify.app"
  // ];

  // app.use(require("cors")({
  //   origin: allowedOrigins,
  //   credentials: true
  // }));

  // // ------------------- MongoDB Connection -------------------
  // mongoose.connect(process.env.MONGODB_URI, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true
  // })
  // .then(() => console.log("✅ MongoDB connected"))
  // .catch(err => console.error("❌ MongoDB connection error:", err));

  // // ------------------- Brevo (Sendinblue) Setup -------------------
  // const defaultClient = SibApiV3Sdk.ApiClient.instance;
  // const apiKey = defaultClient.authentications['api-key'];
  // if (!apiKey) {
  //   console.error("❌ Brevo SDK: 'api-key' authentication not found");
  // } else {
  //   apiKey.apiKey = process.env.BREVO_SMTP_KEY;
  // }
  // const emailClient = new SibApiV3Sdk.TransactionalEmailsApi();

  // // ------------------- Routes -------------------
  // app.use("/api/auth", authRoutes);
  // app.use("/api/rooms", roomRoutes);
  // app.use("/api/chat", chatRoutes);
  // app.use("/api/protected", protectedRoutes);
  // app.use("/api/meetings", meetingRoutes);

  // // Root
  // app.get("/", (_req, res) => res.send("Video Chat Backend Running..."));

  // // ------------------- Test Email Route -------------------
  // app.get("/test-email", async (req, res) => {
  //   try {
  //     const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail({
  //       to: [{ email: "your_email@gmail.com" }], // 🔹 replace with your actual email
  //       sender: { email: process.env.BREVO_USER, name: "VideoChat" }, // must be verified in Brevo
  //       subject: "✅ Brevo SDK Working!",
  //       textContent: "Your backend can now send emails successfully!"
  //     });

  //     const response = await emailClient.sendTransacEmail(sendSmtpEmail);
  //     console.log("✅ Email sent:", response);
  //     res.send("✅ Test email sent! Check your inbox.");
  //   } catch (err) {
  //     console.error("❌ Test email failed:", err);
  //     res.status(500).send("❌ Failed to send email: " + err.message);
  //   }
  // });

  // // ------------------- HTTP + Socket.IO -------------------
  // const PORT = process.env.PORT || 5000;
  // const server = http.createServer(app);

  // // Initialize Socket.IO
  // initSocket(server);

  // // Start server
  // server.listen(PORT, () => {
  //   console.log(`🚀 Server running on http://localhost:${PORT}`);
  // });

  // require("dotenv").config();
  // const express = require("express");
  // const http = require("http");
  // const mongoose = require("mongoose");
  // const SibApiV3Sdk = require("sib-api-v3-sdk");
  // const initSocket = require("./socket");

  // // Routes
  // const authRoutes = require("./routes/authRoutes");
  // const roomRoutes = require("./routes/roomRoutes");
  // const chatRoutes = require("./routes/chatRoutes");
  // const protectedRoutes = require("./routes/protectedRoutes");
  // const meetingRoutes = require("./routes/meetingRoutes");
  // const { brevoClient, gmailTransporter } = require("./config/emailClient");
  // const morgan = require("morgan");

  // const app = express();

  // // Middleware
  // app.use(express.json());
  // app.use(morgan("dev"));

  // const allowedOrigins = [
  //   "http://localhost:5173",
  //   "https://vi-meet-1c0480.netlify.app"
  // ];
  // app.use(require("cors")({ origin: allowedOrigins, credentials: true }));

  // // MongoDB Connection
  // mongoose.connect(process.env.MONGODB_URI, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true
  // })
  // .then(() => console.log("✅ MongoDB connected"))
  // .catch(err => console.error("❌ MongoDB connection error:", err));

  // // Routes
  // app.use("/api/auth", authRoutes);
  // app.use("/api/rooms", roomRoutes);
  // app.use("/api/chat", chatRoutes);
  // app.use("/api/protected", protectedRoutes);
  // app.use("/api/meetings", meetingRoutes);

  // // Root
  // app.get("/", (_req, res) => res.send("Video Chat Backend Running..."));

  // // Test Brevo email
  // app.get("/test-email", async (req, res) => {
  //   const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail({
  //     to: [{ email: "whyrush711@gmail.com" }],
  //     sender: { email: process.env.BREVO_USER, name: process.env.EMAIL_FROM },
  //     subject: "✅ Brevo SDK Test Email",
  //     htmlContent: "<h1>Your backend can now send emails successfully!</h1>"
  //   });

  //   try {
  //     const response = await brevoClient.sendTransacEmail(sendSmtpEmail);
  //     console.log("✅ Brevo email sent:", response);
  //     res.send("✅ Test email sent! Check your inbox.");
  //   } catch (err) {
  //     console.error("❌ Brevo test email failed:", err);

  //     // Gmail fallback
  //     try {
  //       await gmailTransporter.sendMail({
  //         from: `"${process.env.EMAIL_FROM}" <${process.env.GOOGLE_APP_EMAIL}>`,
  //         to: "whyrush711@gmail.com",
  //         subject: "✅ Gmail Fallback Test Email",
  //         html: "<h1>Sent via Gmail fallback!</h1>"
  //       });
  //       console.log("✅ Gmail fallback email sent!");
  //       res.send("✅ Email sent via Gmail fallback!");
  //     } catch (gmailErr) {
  //       console.error("❌ Gmail fallback failed:", gmailErr);
  //       res.status(500).send("❌ Failed to send email: " + gmailErr.message);
  //     }
  //   }
  // });


  // // HTTP + Socket.IO
  // const PORT = process.env.PORT || 5000;
  // const server = http.createServer(app);
  // initSocket(server);

  // // Start server
  // server.listen(PORT, () => {
  //   console.log(`🚀 Server running on http://localhost:${PORT}`);
  // });


require("dotenv").config();
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const SibApiV3Sdk = require("sib-api-v3-sdk");
const morgan = require("morgan");
const initSocket = require("./socket");
const connectDB = require("./config/db");
const {sendSmtpEmail } = require("./config/nodemailer")

// Routes
const authRoutes = require("./routes/authRoutes");
const roomRoutes = require("./routes/roomRoutes");
const chatRoutes = require("./routes/chatRoutes");
const protectedRoutes = require("./routes/protectedRoutes");
const meetingRoutes = require("./routes/meetingRoutes");

// Email clients
const { brevoClient, gmailTransporter } = require("./config/emailClient");

const app = express();

// ------------------- Middleware -------------------
app.use(express.json());
app.use(morgan("dev")); // HTTP request logging

const allowedOrigins = [
  "http://localhost:5173",
  "https://vi-meet-1c0480.netlify.app"
];
app.use(require("cors")({ origin: allowedOrigins, credentials: true }));

// ------------------- MongoDB Connection -------------------
connectDB();

// ------------------- Routes -------------------
app.use("/api/auth", authRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/protected", protectedRoutes);
app.use("/api/meetings", meetingRoutes);

// Root
app.get("/", (_req, res) => res.send("Video Chat Backend Running..."));
app.get("/test-email", sendSmtpEmail);

// ------------------- HTTP + Socket.IO -------------------
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

// Initialize Socket.IO
initSocket(server);

// Start server
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
