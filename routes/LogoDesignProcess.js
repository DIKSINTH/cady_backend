import express from "express";
import db from "../db/ConnectDB.js";

const router = express.Router();

// GET: /api/logo-design-process
router.get("/", (req, res) => {
  const query = `
    SELECT
      Design_Process1,
      Design_Process11,
      Design_Process12,
      Design_Process2,
      Design_Process21,
      Design_Process22,
      Design_Process3,
      Design_Process31,
      Design_Process32,
      Design_Process4,
      Design_Process41,
      Design_Process42
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
      return res.status(200).json([]);
    }

    res.status(200).json(results);
  });
});

export default router;
