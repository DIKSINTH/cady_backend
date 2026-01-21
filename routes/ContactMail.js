import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, phone, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false, // TLS
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // 🔍 Verify SMTP connection
    await transporter.verify();

    await transporter.sendMail({
      from: `"Website Contact" <${process.env.MAIL_FROM}>`,
      to: process.env.MAIL_TO,
      replyTo: email,
      subject: "📩 New Contact Form Submission",
      html: `
        <h3>New Contact Request</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("❌ Mail Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
