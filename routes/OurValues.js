import express from "express";
import pool from "../db/ConnectDB.js"; // promise-based pool

const router = express.Router();

// --- API Route to Fetch About Us Values ---
router.get("/", async (req, res) => {
  try {
    const [results] = await pool.query(
      "SELECT Value1, Value2, Value3, Value4 FROM about_us LIMIT 1",
    );

    if (results.length === 0) {
      return res.status(404).json({ message: "Values content not found" });
    }

    const valuesObject = results[0];
    const valuesArray = [
      valuesObject.Value1,
      valuesObject.Value2,
      valuesObject.Value3,
      valuesObject.Value4,
    ].filter(Boolean); // remove null/empty values

    res.json(valuesArray);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Error fetching data from database" });
  }
});

export default router;
