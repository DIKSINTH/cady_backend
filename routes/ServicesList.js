import express from "express";
import pool from "../db/ConnectDB.js"; // promise-based pool

const router = express.Router();

// GET all services – return id, name, description, image_url, url
router.get("/", async (req, res) => {
  try {
    const query = `
      SELECT 
        id, 
        Name AS name, 
        Description AS description, 
        Image AS image_url,
        URL AS url
      FROM services
    `;

    const [data] = await pool.query(query);
    res.json(data);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Error fetching services" });
  }
});
export default router;
