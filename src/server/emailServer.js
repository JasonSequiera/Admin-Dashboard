// server/emailServer.js
import express from "express";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import cors from "cors";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ Configure Nodemailer with Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "nexawebsolutions.info@gmail.com",   // your Gmail
    pass: "wamz ypvp alop jqoi",               // your Gmail App Password
  },
});

// ✅ API route to send reset email
app.post("/send-reset-email", async (req, res) => {
  try {
    const { email, resetLink } = req.body;

    if (!email || !resetLink) {
      return res.status(400).json({
        success: false,
        error: "Email and reset link are required.",
      });
    }

    const info = await transporter.sendMail({
      from: '"Admin Portal" <nexawebsolutions.info@gmail.com>', // must match your Gmail
      to: email,
      subject: "Reset Your Password",
      html: `
        <p>Hello,</p>
        <p>You requested to reset your password for the Admin Portal.</p>
        <p>
          <a href="${resetLink}" target="_blank" style="color:#2563eb; font-weight:bold;">
            Click here to reset your password
          </a>
        </p>
        <p>If you did not request this, please ignore this email.</p>
      `,
    });

    console.log("✅ Reset email sent successfully!");
    console.log("📩 Message ID:", info.messageId);

    return res.json({
      success: true,
      message: `Password reset email sent successfully to ${email}.`,
    });
  } catch (error) {
    console.error("❌ Email sending failed:", error.message);

    return res.status(500).json({
      success: false,
      error: "Failed to send reset email. Please try again later.",
    });
  }
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Email server running on http://localhost:${PORT}`)
);
