import express from "express";
import db from "../db/ConnectDB.js";

const router = express.Router();

// GET: /api/welcome-logo-design
router.get("/", (req, res) => {
  const query = `
    SELECT Title, Description, Image
    FROM logo_design
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
      return res.status(200).json({
        Title: "",
        Description: "",
        Image: "",
      });
    }

    res.status(200).json(results[0]);
  });
});

export default router;
