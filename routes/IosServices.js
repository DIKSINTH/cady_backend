import express from "express";
import db from "../db/ConnectDB.js";

const router = express.Router();

router.get("/", (req, res) => {
  const query = `
    SELECT Service1, Service2, Service3, Service4
    FROM ios_development
    ORDER BY id DESC
    LIMIT 1
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (!results.length) {
      return res.status(404).json({
        message: "iOS services content not found",
      });
    }

    const { Service1, Service2, Service3, Service4 } = results[0];

    res.json([Service1, Service2, Service3, Service4].filter(Boolean));
  });
});

export default router;
