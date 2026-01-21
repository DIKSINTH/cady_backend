import express from "express";
import db from "../db/ConnectDB.js";

const router = express.Router();

router.get("/", (req, res) => {
  const sql = "SELECT Bottom_Description FROM logo_design LIMIT 1";
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length > 0) {
      res.json({ description: result[0].Bottom_Description });
    } else {
      res.status(404).json({ message: "No description found" });
    }
  });
});

export default router;
