import express from "express";
import db from "../db/ConnectDB.js";

const router = express.Router();

// --- API Route to Fetch Why iOS Points (4 items) ---
router.get("/", (req, res) => {
  const query = `
    SELECT 
      Why_Ios1,
      Why_Ios2,
      Why_Ios3,
      Why_Ios4
    FROM ios_development
    LIMIT 1
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (!results.length) {
      return res.status(404).json({ message: "Why iOS content not found" });
    }

    const data = results[0];

    const pointsArray = [
      data.Why_Ios1,
      data.Why_Ios2,
      data.Why_Ios3,
      data.Why_Ios4,
    ].filter(Boolean);

    res.json(pointsArray);
  });
});

export default router;
