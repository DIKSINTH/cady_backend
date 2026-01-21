import express from "express";
import db from "../db/ConnectDB.js";

const router = express.Router();

// Fetch slides from "banners" table
router.get("/", (req, res) => {
  const query = `
    SELECT 
      id,
      Title AS title,
      Description AS description,
      Image AS image_url
    FROM banners
    ORDER BY id ASC
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Error fetching slides" });
    }

    res.json(results);
  });
});

export default router;
