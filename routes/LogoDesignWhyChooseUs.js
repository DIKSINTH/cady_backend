import express from "express";
import db from "../db/ConnectDB.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const sql =
    "SELECT Why_Choose_Us1, Why_Choose_Us2, Why_Choose_Us3, Why_Choose_Us4 FROM logo_design LIMIT 1";

  try {
    const [results] = await db.query(sql);

    if (!results.length) {
      return res.status(404).json({ message: "No data found" });
    }

    const row = results[0];
    const reasons = [
      row.Why_Choose_Us1,
      row.Why_Choose_Us2,
      row.Why_Choose_Us3,
      row.Why_Choose_Us4,
    ].filter(Boolean); // remove null/empty values

    res.json(reasons);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Database error" });
  }
});

export default router;
