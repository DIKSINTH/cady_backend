import express from "express";
import db from "../db/ConnectDB.js";

const router = express.Router();

// ---------- GET SETTINGS (one row only) ----------
router.get("/", (req, res) => {
  db.query("SELECT * FROM settings LIMIT 1", (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result[0] || {});
  });
});

// ---------- UPDATE SETTINGS ----------
router.put("/", (req, res) => {
  const {
    Address,
    Mobile_Number,
    Email,
    Facebook_URL,
    Instagram_URL,
    LinkedIn_URL,
    Skype_URL,
    Google_Map,
    Whatsapp,
  } = req.body;

  const sql = `
    UPDATE settings SET 
      Address=?, 
      Mobile_Number=?, 
      Email=?, 
      Facebook_URL=?, 
      Instagram_URL=?, 
      LinkedIn_URL=?, 
      Skype_URL=?, 
      Google_Map=?, 
      Whatsapp=? 
    LIMIT 1
  `;

  db.query(
    sql,
    [
      Address,
      Mobile_Number,
      Email,
      Facebook_URL,
      Instagram_URL,
      LinkedIn_URL,
      Skype_URL,
      Google_Map,
      Whatsapp,
    ],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Settings updated successfully" });
    }
  );
});

export default router;
