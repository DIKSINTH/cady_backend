import express from "express";
import pool from "../db/ConnectDB.js"; // promise-based pool

const router = express.Router();

// GET all banners/slides
router.get("/", async (req, res) => {
  try {
    const query = `
      SELECT 
        id,
        Title AS title,
        Description AS description,
        Image AS image_url
      FROM banners
      ORDER BY id ASC
    `;

    const [results] = await pool.query(query);

    res.json(results);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Error fetching slides" });
  }
});

export default router;
