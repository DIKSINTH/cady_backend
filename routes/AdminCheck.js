import express from "express";
import db from "../db/ConnectDB.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    let { Email, Password } = req.body;
    console.log("BODY RECEIVED:", req.body); // 👈 ADD THIS

    // Validate
    if (!Email || !Password) {
      return res.status(400).json({
        status: "fail",
        message: "Email and password are required",
      });
    }

    // Remove hidden spaces
    Email = Email.trim().toLowerCase();
    Password = Password.trim();

    // Case-insensitive email match
    const sql = "SELECT * FROM admin WHERE LOWER(Email) = ? LIMIT 1";
    const [results] = await db.query(sql, [Email]);

    if (results.length === 0) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid email or password",
      });
    }

    const user = results[0];

    // Plain text comparison (since you said DB is plain)
    const isMatch = Password === user.Password.trim();

    if (!isMatch) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid email or password",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Login successful",
      user: {
        id: user.id,
        name: user.Name,
        email: user.Email,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      status: "error",
      message: "Server error. Please try again later.",
    });
  }
});

export default router;
