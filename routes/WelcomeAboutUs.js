import express from "express";
import db from "../db/ConnectDB.js";

const router = express.Router();

// Fetch welcome section content
router.get("/", (req, res) => {
  const sql = "SELECT About, Vision, Mission, Image FROM about_us LIMIT 1";

  db.query(sql, (err, result) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (!result.length) {
      return res.status(404).json({ message: "Content not found" });
    }

    // Image is only filename (e.g. about.png)
    res.json(result[0]);
  });
});

export default router;
