import express from "express";
import pool from "../db/ConnectDB.js"; // Promise-based pool

const router = express.Router();

// --- API Route to Fetch Welcome Testimonial Content ---
router.get("/", async (req, res) => {
  try {
    const query = `
      SELECT Heading, Content, Image 
      FROM testimonial_content 
      LIMIT 1
    `;

    const [results] = await pool.query(query);

    if (results.length === 0) {
      return res.status(404).json({
        message: "Welcome testimonial content not found",
      });
    }

    res.json(results[0]);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({
      message: "Error fetching testimonial content from database",
    });
  }
});

export default router;
