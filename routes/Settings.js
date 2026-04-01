import express from "express";
import pool from "../db/ConnectDB.js"; // Promise-based pool

const router = express.Router();

// ---------- GET SETTINGS (single row) ----------
router.get("/", async (req, res) => {
  try {
    const [results] = await pool.query("SELECT * FROM settings LIMIT 1");
    res.json(results[0] || {});
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Database error" });
  }
});

// ---------- UPDATE SETTINGS ----------
router.put("/", async (req, res) => {
  try {
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

    await pool.query(sql, [
      Address,
      Mobile_Number,
      Email,
      Facebook_URL,
      Instagram_URL,
      LinkedIn_URL,
      Skype_URL,
      Google_Map,
      Whatsapp,
    ]);

    res.json({ message: "Settings updated successfully" });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Database error" });
  }
});

export default router;
