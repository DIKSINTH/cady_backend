import express from "express";
import db from "../db/ConnectDB.js";

const router = express.Router();

router.get("/", (req, res) => {
  const query = `
    SELECT 
      id,
      Name AS name,
      Image AS image_url
    FROM blog
    ORDER BY id DESC
  `;

  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: "DB error" });
    res.json(results);
  });
});

export default router;
