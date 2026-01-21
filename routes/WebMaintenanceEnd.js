import express from "express";
import db from "../db/ConnectDB.js";

const router = express.Router();

// Fetch CTA content for Web Maintenance
router.get("/", (req, res) => {
  const query = `
    SELECT Content1, Content2
    FROM web_maintenance
    ORDER BY id DESC
    LIMIT 1
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({
        message: "Database error",
      });
    }

    // ✅ IMPORTANT: Never return 404
    if (!results.length) {
      return res.json({
        Content1: "",
        Content2: "",
      });
    }

    res.json(results[0]);
  });
});

export default router;
