import express from "express";
import pool from "../db/ConnectDB.js"; // Promise-based pool

const router = express.Router();

// --- API Route to Fetch Visiting Card Bottom Description ---
router.get("/", async (req, res) => {
  try {
    const sql = "SELECT Bottom_Description FROM visiting_card LIMIT 1";
    const [results] = await pool.query(sql);

    if (results.length === 0) {
      return res.status(404).json({ message: "No description found" });
    }

    res.json({ description: results[0].Bottom_Description });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Database error" });
  }
});

export default router;
