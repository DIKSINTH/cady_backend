import express from "express";
import db from "../db/ConnectDB.js";

const router = express.Router();

// GET: /api/logo-design-process
router.get("/", async (req, res) => {
  const query = `
    SELECT
      Design_Process1,
      Design_Process11,
      Design_Process12,
      Design_Process2,
      Design_Process21,
      Design_Process22,
      Design_Process3,
      Design_Process31,
      Design_Process32,
      Design_Process4,
      Design_Process41,
      Design_Process42
    FROM logo_design
    LIMIT 1
  `;

  try {
    const [results] = await db.query(query);

    if (!results.length) {
      return res.status(200).json([]); // return empty array if no data
    }

    res.status(200).json(results[0]); // return the first row
  } catch (error) {
    console.error("❌ Database error:", error);
    res.status(500).json({ message: "Database error" });
  }
});

export default router;
