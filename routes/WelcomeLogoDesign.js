import express from "express";
import pool from "../db/ConnectDB.js"; // Promise-based pool

const router = express.Router();

// --- API Route to Fetch Logo Design Content ---
router.get("/", async (req, res) => {
  try {
    const query = `
      SELECT Title, Description, Image
      FROM logo_design
      LIMIT 1
    `;

    const [results] = await pool.query(query);

    // Always return an object, even if no data
    if (results.length === 0) {
      return res.status(200).json({
        Title: "",
        Description: "",
        Image: "",
      });
    }

    res.status(200).json(results[0]);
  } catch (error) {
    console.error("❌ Database error:", error.sqlMessage || error);
    res.status(500).json({
      message: "Database error",
    });
  }
});

export default router;
