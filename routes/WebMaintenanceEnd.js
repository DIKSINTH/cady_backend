import express from "express";
import pool from "../db/ConnectDB.js"; // Promise-based pool

const router = express.Router();

// --- API Route to Fetch Web Maintenance CTA Content ---
router.get("/", async (req, res) => {
  try {
    const query = `
      SELECT Content1, Content2
      FROM web_maintenance
      ORDER BY id DESC
      LIMIT 1
    `;

    const [results] = await pool.query(query);

    // Always return object, even if no data
    if (results.length === 0) {
      return res.json({
        Content1: "",
        Content2: "",
      });
    }

    res.json(results[0]);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({
      message: "Database error",
    });
  }
});

export default router;
