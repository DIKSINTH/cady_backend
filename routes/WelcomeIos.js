import express from "express";
import pool from "../db/ConnectDB.js"; // Promise-based pool

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const query =
      "SELECT Title, Description, Image FROM ios_development LIMIT 1";
    const [results] = await pool.query(query); // returns [rows, fields]

    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "iOS Development content not found" });
    }

    res.json(results[0]); // send the first row
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ message: "Error fetching data from database" });
  }
});

export default router;
