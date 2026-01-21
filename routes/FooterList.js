import express from "express";
import db from "../db/ConnectDB.js";

const router = express.Router();

router.get("/", (req, res) => {
  const query = `
    SELECT 
      Content, 
      Item1, Item2, Item3, Item4, Item5, Item6, Item7, Item8 
    FROM footer 
    LIMIT 1
  `;

  const settingsQuery = `
    SELECT Address, Mobile_Number, Email 
    FROM settings 
    LIMIT 1
  `;

  db.query(query, (err, footerResults) => {
    if (err) {
      console.error("Footer Fetch Error:", err);
      return res.status(500).json({ error: "Error fetching footer data" });
    }

    db.query(settingsQuery, (err, settingsResults) => {
      if (err) {
        console.error("Settings Fetch Error:", err);
        return res.status(500).json({ error: "Error fetching settings" });
      }

      const footer = footerResults[0] || {};
      const settings = settingsResults[0] || {};

      // Build services array from Item1–Item8
      const services = [
        footer.Item1,
        footer.Item2,
        footer.Item3,
        footer.Item4,
        footer.Item5,
        footer.Item6,
        footer.Item7,
        footer.Item8,
      ].filter((item) => item && item.trim() !== ""); // remove empty values

      res.json({
        content: footer.Content || "",
        services,
        settings,
      });
    });
  });
});

export default router;
