import express from "express";
import db from "../db/ConnectDB.js";

const router = express.Router();

router.get("/", (req, res) => {
  const query = `
    SELECT 
      CONCAT('/uploads/', Image) AS Image_url
    FROM logo
    ORDER BY id ASC
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("DB ERROR:", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.json(results);
  });
});

export default router;
