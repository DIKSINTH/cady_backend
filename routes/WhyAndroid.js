import express from "express";
import pool from "../db/ConnectDB.js"; // Promise-based pool

const router = express.Router();

// --- API Route to Fetch Why Android Points ---
router.get("/", async (req, res) => {
  try {
    const query = `
      SELECT 
        Why_Android1,
        Why_Android2,
        Why_Android3,
        Why_Android4,
        Why_Android5,
        Why_Android6
      FROM android_development
      LIMIT 1
    `;

    const [results] = await pool.query(query);

    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: '"Why Android" content not found' });
    }

    const data = results[0];

    const pointsArray = [
      data.Why_Android1,
      data.Why_Android2,
      data.Why_Android3,
      data.Why_Android4,
      data.Why_Android5,
      data.Why_Android6,
    ].filter(Boolean); // remove null/empty values

    res.json(pointsArray);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Database error" });
  }
});

export default router;
