import express from "express";
import db from "../db/ConnectDB.js";

const router = express.Router();

// --- API Route to Fetch Android Service Points ---
router.get("/", async (req, res) => {
  try {
    const query = `
      SELECT Service1, Service2, Service3, Service4, Service5, Service6
      FROM android_development
      LIMIT 1
    `;

    const [results] = await db.query(query);

    if (!results.length) {
      return res.status(404).json({
        success: false,
        message: "Android services not found",
      });
    }

    const data = results[0];

    const services = [
      data.Service1,
      data.Service2,
      data.Service3,
      data.Service4,
      data.Service5,
      data.Service6,
    ].filter((item) => item && item.trim() !== "");

    res.status(200).json({
      success: true,
      services,
    });
  } catch (err) {
    console.error("Android Services DB Error:", err);
    res.status(500).json({
      success: false,
      message: "Database error",
    });
  }
});

export default router;
