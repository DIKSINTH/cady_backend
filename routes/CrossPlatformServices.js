import express from "express";
import db from "../db/ConnectDB.js";

const router = express.Router();

// GET: /api/cross-platform-services
router.get("/", (req, res) => {
  const query = `
    SELECT
      Service1,
      Service2,
      Service3,
      Service4
    FROM crossplatform_development
    LIMIT 1
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("❌ DB Error:", err.sqlMessage || err);
      return res.status(500).json({
        message: "Database error",
      });
    }

    if (!results || results.length === 0) {
      return res.status(200).json([]);
    }

    const row = results[0];

    const services = [
      row.Service1,
      row.Service2,
      row.Service3,
      row.Service4,
    ].filter(Boolean);

    res.status(200).json(services);
  });
});

export default router;
