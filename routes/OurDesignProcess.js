import express from "express";
import pool from "../db/ConnectDB.js"; // use promise-based pool

const router = express.Router();

// --- API Route to Fetch Design Processes ---
router.get("/", async (req, res) => {
  try {
    const [results] = await pool.query(
      "SELECT Process1, Process2, Process3, Process4, Process5 FROM web_design LIMIT 1",
    );

    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "Design process content not found" });
    }

    const { Process1, Process2, Process3, Process4, Process5 } = results[0];

    const processesArray = [
      Process1,
      Process2,
      Process3,
      Process4,
      Process5,
    ].filter(Boolean);

    res.json(processesArray);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Error fetching data from database" });
  }
});

export default router;
