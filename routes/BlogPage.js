import express from "express";
import db from "../db/ConnectDB.js";

const router = express.Router();

router.get("/:id", (req, res) => {
  const query = `
    SELECT 
      Name AS name,
      Description AS description,
      Image AS image
    FROM blog
    WHERE id = ?
  `;

  db.query(query, [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: "DB error" });
    if (result.length === 0)
      return res.status(404).json({ error: "Blog not found" });

    res.json(result[0]);
  });
});

export default router;
