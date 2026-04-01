import express from "express";
import pool from "../db/ConnectDB.js"; // promise-based pool

const router = express.Router();

// GET all logos with full image URL
router.get("/", async (req, res) => {
  try {
    const query = `
      SELECT CONCAT('/uploads/', Image) AS Image_url
      FROM logo
      ORDER BY id ASC
    `;

    const [results] = await pool.query(query);

    res.json(results);
  } catch (error) {
    console.error("DB Error:", error);
    res.status(500).json({ message: "Database error" });
  }
});

export default router;
