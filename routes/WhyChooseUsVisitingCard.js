import express from "express";
import pool from "../db/ConnectDB.js"; // Promise-based pool

const router = express.Router();

// --- API Route to Fetch "Why Choose Us" Data ---
router.get("/", async (req, res) => {
  try {
    const sql = `
      SELECT 
        Why_Choose_Us1, Why_Choose_Us11, 
        Why_Choose_Us2, Why_Choose_Us21, 
        Why_Choose_Us3, Why_Choose_Us31 
      FROM visiting_card 
      LIMIT 1
    `;

    const [result] = await pool.query(sql);

    if (result.length === 0) {
      return res.status(404).json({ message: "No data found" });
    }

    const data = [
      { title: result[0].Why_Choose_Us1, desc: result[0].Why_Choose_Us11 },
      { title: result[0].Why_Choose_Us2, desc: result[0].Why_Choose_Us21 },
      { title: result[0].Why_Choose_Us3, desc: result[0].Why_Choose_Us31 },
    ].filter((item) => item.title || item.desc); // filter out empty items

    res.json(data);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Database error" });
  }
});

export default router;
