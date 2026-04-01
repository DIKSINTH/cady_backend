import express from "express";
import pool from "../db/ConnectDB.js"; // Promise-based pool

const router = express.Router();

// --- API Route to Fetch All Services from "Why Choose Us" ---
router.get("/", async (req, res) => {
  try {
    const q = `
      SELECT 
        id, 
        Name AS name, 
        Description AS description, 
        Image AS image_url 
      FROM why_choose_us
    `;

    const [data] = await pool.query(q);

    res.json(data); // Returns array of services
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Database error" });
  }
});

export default router;
