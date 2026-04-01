import express from "express";
import pool from "../db/ConnectDB.js"; // Promise-based pool

const router = express.Router();

// --- API Route to Fetch Web Maintenance Content ---
router.get("/", async (req, res) => {
  try {
    const query = `
      SELECT Title, Description, Image 
      FROM web_maintenance 
      LIMIT 1
    `;

    const [results] = await pool.query(query);

    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "Web Maintenance content not found" });
    }

    res.json(results[0]);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Database error" });
  }
});

export default router;
