import express from "express";
import db from "../db/ConnectDB.js";

const router = express.Router();

/* --------------------------------------
   GET CROSS-PLATFORM SERVICES
--------------------------------------- */
router.get("/", async (req, res) => {
  try {
    const query = `
      SELECT Service1, Service2, Service3, Service4
      FROM crossplatform_development
      LIMIT 1
    `;

    const [results] = await db.query(query);

    if (!results.length) {
      return res.status(200).json([]);
    }

    const row = results[0];

    const services = ["Service1", "Service2", "Service3", "Service4"]
      .map((key) => row[key])
      .filter(Boolean);

    res.status(200).json(services);
  } catch (err) {
    console.error("❌ Database error:", err.message || err);
    res.status(500).json({ message: "Database error" });
  }
});

export default router;
