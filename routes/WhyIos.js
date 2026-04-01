import express from "express";
import pool from "../db/ConnectDB.js"; // Promise-based pool

const router = express.Router();

// --- API Route to Fetch Why iOS Points (4 items) ---
router.get("/", async (req, res) => {
  try {
    const query = `
      SELECT 
        Why_Ios1,
        Why_Ios2,
        Why_Ios3,
        Why_Ios4
      FROM ios_development
      LIMIT 1
    `;

    const [results] = await pool.query(query);

    if (results.length === 0) {
      return res.status(404).json({ message: "Why iOS content not found" });
    }

    const data = results[0];

    const pointsArray = [
      data.Why_Ios1,
      data.Why_Ios2,
      data.Why_Ios3,
      data.Why_Ios4,
    ].filter(Boolean); // Remove any null/empty values

    res.json(pointsArray);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ message: "Database error" });
  }
});

export default router;
