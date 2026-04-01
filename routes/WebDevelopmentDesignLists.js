import express from "express";
import pool from "../db/ConnectDB.js"; // Promise-based pool

const router = express.Router();

// --- API Route to Fetch Design Values ---
router.get("/", async (req, res) => {
  try {
    const query =
      "SELECT Design1, Design2, Design3, Design4, Design5 FROM web_development LIMIT 1";

    const [results] = await pool.query(query);

    if (results.length === 0) {
      return res.status(404).json({ message: "Design values not found" });
    }

    const { Design1, Design2, Design3, Design4, Design5 } = results[0];

    const valuesArray = [Design1, Design2, Design3, Design4, Design5].filter(
      Boolean,
    );

    res.json(valuesArray);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Database error" });
  }
});

export default router;
