import express from "express";
import db from "../db/ConnectDB.js";

const router = express.Router();

router.get("/", (req, res) => {
  const query = `
    SELECT Design1, Design2, Design3, Design4, Design5
    FROM web_maintenance
    ORDER BY id DESC
    LIMIT 1
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database error" });
    }

    if (!results.length) {
      return res.status(404).json({ message: "Design values not found" });
    }

    const { Design1, Design2, Design3, Design4, Design5 } = results[0];

    res.json([Design1, Design2, Design3, Design4, Design5].filter(Boolean));
  });
});

export default router;
