import express from "express";
import pool from "../db/ConnectDB.js"; // Promise-based pool

const router = express.Router();

// --- API Route to Fetch About Us Content ---
router.get("/", async (req, res) => {
  try {
    const sql = "SELECT About, Vision, Mission, Image FROM about_us LIMIT 1";

    const [result] = await pool.query(sql);

    if (result.length === 0) {
      return res.status(404).json({ message: "Content not found" });
    }

    // Return the first row
    res.json(result[0]);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ message: "Database error" });
  }
});

export default router;
