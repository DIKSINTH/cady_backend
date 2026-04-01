// routes/BlogLists.js

import express from "express";
import db from "../db/ConnectDB.js";

const router = express.Router();

/* -------------------------------
   GET ALL BLOGS
-------------------------------- */
router.get("/", async (req, res) => {
  try {
    const query = `
      SELECT 
        id,
        Name AS name,
        Image AS image_url
      FROM blog
      ORDER BY id DESC
    `;

    const [results] = await db.query(query);

    // ✅ Just send filename only
    res.status(200).json(results);
  } catch (err) {
    console.error("BlogLists DB Error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

export default router;
