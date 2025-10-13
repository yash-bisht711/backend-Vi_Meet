const nodemailer = require("nodemailer");
require("dotenv").config()

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.GOOGLE_APP_EMAIL,
//     pass: process.env.GOOGLE_APP_PASSWORD,
//   },
// });

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, 
  auth: {
    user: process.env.GOOGLE_APP_EMAIL,
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
});

transporter.verify((err, success) => {
  if (err) {
    console.error('❌ SMTP connection failed:', err.message);
  } else {
    console.log('✅ SMTP connection successful. Ready to send emails.');
  }
});

module.exports = transporter;
