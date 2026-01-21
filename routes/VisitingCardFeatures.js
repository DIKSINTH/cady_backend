import express from "express";
import db from "../db/ConnectDB.js";

const router = express.Router();

router.get("/", (req, res) => {
  const sql =
    "SELECT Feature1, Feature2, Feature3, Feature4 FROM visiting_card LIMIT 1";
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length > 0) {
      // Map columns to an array for easy rendering
      const features = [
        result[0].Feature1,
        result[0].Feature2,
        result[0].Feature3,
        result[0].Feature4,
      ];
      res.json(features);
    } else {
      res.status(404).json({ message: "No data found" });
    }
  });
});

export default router;
