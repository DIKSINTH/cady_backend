import express from "express";
import db from "../db/ConnectDB.js";

const router = express.Router();

// GET Visiting Card Welcome Content
router.get("/", (req, res) => {
  const query = `
    SELECT Title, Description, Image
    FROM visiting_card
    LIMIT 1
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).json({
        message: "Error fetching visiting card data",
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        message: "Visiting card content not found",
      });
    }

    res.json(results[0]);
  });
});

export default router;
