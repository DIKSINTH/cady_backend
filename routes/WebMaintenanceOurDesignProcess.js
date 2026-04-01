import express from "express";
import pool from "../db/ConnectDB.js"; // Promise-based pool

const router = express.Router();

// --- API Route to Fetch Web Maintenance Process ---
router.get("/", async (req, res) => {
  try {
    const query = `
      SELECT Process1, Process2, Process3, Process4, Process5, Process6
      FROM web_maintenance
      ORDER BY id DESC
      LIMIT 1
    `;

    const [results] = await pool.query(query);

    if (results.length === 0) {
      return res.json([]); // Return empty array if no data
    }

    const { Process1, Process2, Process3, Process4, Process5, Process6 } =
      results[0];

    // Filter out any null/empty values
    const processes = [
      Process1,
      Process2,
      Process3,
      Process4,
      Process5,
      Process6,
    ].filter(Boolean);

    res.json(processes);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ message: "Database error" });
  }
});

export default router;
