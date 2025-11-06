const SibApiV3Sdk = require("sib-api-v3-sdk");
const { brevoClient, gmailTransporter } = require("./emailClient");
require("dotenv").config();

if (!process.env.BREVO_SMTP_KEY || !process.env.BREVO_USER) {
  console.error("❌ Missing Brevo environment variables!");
  process.exit(1);
}
if (!process.env.GOOGLE_APP_EMAIL || !process.env.GOOGLE_APP_PASSWORD) {
  console.warn("⚠️ Gmail fallback env variables missing, fallback won't work!");
}

const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_SMTP_KEY;
const emailClient = new SibApiV3Sdk.TransactionalEmailsApi();

const sendSmtpEmail = async (req, res) => {
  const toEmail = req.query.to || "whyrush711@gmail.com";

  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail({
    to: [{ email: toEmail }],
    sender: { email: process.env.BREVO_USER, name: process.env.EMAIL_FROM || "VideoChat" },
    subject: "✅ Brevo SDK Test Email",
    htmlContent: "<h1>Your backend can now send emails successfully!</h1>"
  });

  try {
    const response = await brevoClient.sendTransacEmail(sendSmtpEmail);
    console.log("✅ Brevo email sent:", response);
    res.send(`✅ Test email sent via Brevo! Check inbox of ${toEmail}.`);
  } catch (err) {
    console.error("❌ Brevo test email failed:", err);

    // Gmail fallback
    if (process.env.GOOGLE_APP_EMAIL && process.env.GOOGLE_APP_PASSWORD) {
      try {
        await gmailTransporter.sendMail({
          from: `"${process.env.EMAIL_FROM || "Vi-Meet"}" <${process.env.GOOGLE_APP_EMAIL}>`,
          to: toEmail,
          subject: "✅ Gmail Fallback Test Email",
          html: "<h1>Sent via Gmail fallback!</h1>"
        });
        console.log("✅ Gmail fallback email sent!");
        res.send(`✅ Email sent via Gmail fallback! Check inbox of ${toEmail}.`);
      } catch (gmailErr) {
        console.error("❌ Gmail fallback failed:", gmailErr);
        res.status(500).send("❌ Failed to send email via both providers: " + gmailErr.message);
      }
    } else {
      res.status(500).send("❌ Failed to send email via Brevo and Gmail fallback not configured.");
    }
  }
}

exports.sendSmtpEmail = sendSmtpEmail;