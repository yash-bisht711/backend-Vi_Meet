require("dotenv").config();
const SibApiV3Sdk = require("sib-api-v3-sdk");
const nodemailer = require("nodemailer");

// ---- Brevo (Sendinblue) Setup ----
if (!process.env.BREVO_SMTP_KEY || !process.env.BREVO_USER) {
  console.error("❌ Brevo env variables missing!");
  process.exit(1);
}
if (!process.env.GOOGLE_APP_EMAIL || !process.env.GOOGLE_APP_PASSWORD) {
  console.error("❌ Gmail fallback env variables missing!");
}

const defaultClient = SibApiV3Sdk.ApiClient.instance;
defaultClient.authentications['api-key'].apiKey = process.env.BREVO_SMTP_KEY;
const brevoClient = new SibApiV3Sdk.TransactionalEmailsApi();

// ---- Gmail SMTP fallback ----
const gmailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GOOGLE_APP_EMAIL,     // your Gmail
    pass: process.env.GOOGLE_APP_PASSWORD   // app password from Gmail
  }
});

module.exports = { brevoClient, gmailTransporter };
