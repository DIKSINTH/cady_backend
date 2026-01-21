import express from "express";
import db from "../db/ConnectDB.js";

const router = express.Router();

router.get("/", (req, res) => {
  const sql = "SELECT Bottom_Description FROM visiting_card LIMIT 1";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (!results.length) {
      return res.status(404).json({ message: "No description found" });
    }

    res.json({
      description: results[0].Bottom_Description,
    });
  });
});

export default router;
