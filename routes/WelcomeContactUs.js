import express from "express";
import db from "../db/ConnectDB.js";

const router = express.Router();

router.get("/", (req, res) => {
  const sql = "SELECT Title, Sub_Title, Image FROM contact_us LIMIT 1";
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result[0]); // Returns the first row object
  });
});
export default router;
