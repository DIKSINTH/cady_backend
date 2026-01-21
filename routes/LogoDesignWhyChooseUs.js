import express from "express";
import db from "../db/ConnectDB.js";

const router = express.Router();

router.get("/", (req, res) => {
  const sql =
    "SELECT Why_Choose_Us1, Why_Choose_Us2, Why_Choose_Us3, Why_Choose_Us4 FROM logo_design LIMIT 1";
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length > 0) {
      // Map row to a clean array
      const reasons = [
        result[0].Why_Choose_Us1,
        result[0].Why_Choose_Us2,
        result[0].Why_Choose_Us3,
        result[0].Why_Choose_Us4,
      ];
      res.json(reasons);
    } else {
      res.status(404).json({ message: "No data found" });
    }
  });
});

export default router;
