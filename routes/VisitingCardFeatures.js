import express from "express";
import pool from "../db/ConnectDB.js"; // Promise-based pool

const router = express.Router();

// --- API Route to Fetch Visiting Card Features ---
router.get("/", async (req, res) => {
  try {
    const sql =
      "SELECT Feature1, Feature2, Feature3, Feature4 FROM visiting_card LIMIT 1";

    const [results] = await pool.query(sql);

    if (results.length === 0) {
      return res.status(404).json({ message: "No data found" });
    }

    const { Feature1, Feature2, Feature3, Feature4 } = results[0];
    const features = [Feature1, Feature2, Feature3, Feature4].filter(Boolean);

    res.json(features);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Database error" });
  }
});

export default router;
