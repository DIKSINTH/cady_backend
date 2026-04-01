import express from "express";
import pool from "../db/ConnectDB.js"; // Promise-based pool

const router = express.Router();

// --- API Route to Fetch Contact Us Content ---
router.get("/", async (req, res) => {
  try {
    const sql = "SELECT Title, Sub_Title, Image FROM contact_us LIMIT 1";

    const [result] = await pool.query(sql);

    if (result.length === 0) {
      return res.status(404).json({ message: "Contact Us content not found" });
    }

    res.json(result[0]); // Returns the first row object
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ message: "Error fetching data from database" });
  }
});

export default router;
