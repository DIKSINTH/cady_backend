import express from "express";
import db from "../db/ConnectDB.js";

const router = express.Router();

router.get("/", (req, res) => {
  const sql =
    "SELECT Why_Choose_Us1, Why_Choose_Us11, Why_Choose_Us2, Why_Choose_Us21, Why_Choose_Us3, Why_Choose_Us31 FROM visiting_card LIMIT 1";
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length > 0) {
      // Mapping the 6 columns into 3 logical boxes
      const data = [
        { title: result[0].Why_Choose_Us1, desc: result[0].Why_Choose_Us11 },
        { title: result[0].Why_Choose_Us2, desc: result[0].Why_Choose_Us21 },
        { title: result[0].Why_Choose_Us3, desc: result[0].Why_Choose_Us31 },
      ];
      res.json(data);
    } else {
      res.status(404).json({ message: "No data found" });
    }
  });
});

export default router;
