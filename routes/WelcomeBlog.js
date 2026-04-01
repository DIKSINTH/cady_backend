import express from "express";
import pool from "../db/ConnectDB.js"; // Promise-based pool

const router = express.Router();

// --- API Route to Fetch Welcome Blog Content ---
router.get("/", async (req, res) => {
  try {
    const query = "SELECT Heading, Content, Image FROM blog_content LIMIT 1";

    const [results] = await pool.query(query);

    if (results.length === 0) {
      return res.status(404).json({
        message: "Welcome blog content not found",
      });
    }

    res.json(results[0]);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({
      message: "Error fetching data from database",
    });
  }
});

export default router;
