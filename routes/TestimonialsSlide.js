import express from "express";
import pool from "../db/ConnectDB.js"; // Promise-based pool

const router = express.Router();

// --- API Route to Fetch All Testimonials ---
router.get("/", async (req, res) => {
  try {
    const sql = "SELECT Name, Position, Description, Image FROM testimonials";
    const [results] = await pool.query(sql);

    // Map the data for frontend; return only filename for Image
    const mappedData = results.map((item) => ({
      Name: item.Name,
      Position: item.Position,
      Description: item.Description,
      Image: item.Image || null,
    }));

    res.json(mappedData);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Database error" });
  }
});

export default router;
