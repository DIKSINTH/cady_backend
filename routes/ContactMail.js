import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

/* ------------------------------
   POST /api/contact
   Send contact form email
------------------------------- */
router.post("/", async (req, res) => {
  const { name, phone, email, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      error: "Name, email, and message are required.",
    });
  }

  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for others
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Optional: Verify SMTP connection once
    await transporter.verify();

    // Send email
    await transporter.sendMail({
      from: `"Website Contact" <${process.env.MAIL_FROM}>`,
      to: process.env.MAIL_TO,
      replyTo: email,
      subject: "📩 New Contact Form Submission",
      html: `
        <h3>New Contact Request</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Phone:</b> ${phone || "N/A"}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    });

    res
      .status(200)
      .json({ success: true, message: "Message sent successfully." });
  } catch (error) {
    console.error("❌ Mail Error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to send message. Please try again later.",
    });
  }
});

export default router;
