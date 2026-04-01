import express from "express";
import pool from "../db/ConnectDB.js"; // Promise-based pool

const router = express.Router();

// --- API Route to Fetch Design Processes ---
router.get("/", async (req, res) => {
  try {
    const query =
      "SELECT Process1, Process2, Process3, Process4, Process5, Process6 FROM web_development LIMIT 1";

    const [results] = await pool.query(query);

    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "Design process content not found" });
    }

    const { Process1, Process2, Process3, Process4, Process5, Process6 } =
      results[0];

    const processesArray = [
      Process1,
      Process2,
      Process3,
      Process4,
      Process5,
      Process6,
    ].filter(Boolean); // remove null/empty values

    res.json(processesArray);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Database error" });
  }
});

export default router;
