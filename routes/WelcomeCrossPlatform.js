import express from "express";
import pool from "../db/ConnectDB.js"; // Promise-based pool

const router = express.Router();

// --- API Route to Fetch Cross Platform Development Content ---
router.get("/", async (req, res) => {
  try {
    const query =
      "SELECT Title, Description, Image FROM crossplatform_development LIMIT 1";

    // Use promise pool: returns [rows, fields]
    const [results] = await pool.query(query);

    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "Cross Platform Development content not found" });
    }

    // Return the first row
    res.json(results[0]);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ message: "Error fetching data from database" });
  }
});

export default router;
