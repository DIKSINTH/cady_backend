import express from "express";
import pool from "../db/ConnectDB.js"; // Promise-based pool

const router = express.Router();

// --- API Route to Fetch Android Development Content ---
router.get("/", async (req, res) => {
  try {
    const query =
      "SELECT Title, Description, Image FROM android_development LIMIT 1";

    const [results] = await pool.query(query);

    if (results.length === 0) {
      return res.status(404).json({
        message: "Android Development content not found",
      });
    }

    res.json(results[0]); // Return the first row
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({
      message: "Error fetching data from database",
    });
  }
});

export default router;
