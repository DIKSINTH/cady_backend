import express from "express";
import db from "../db/ConnectDB.js";

const router = express.Router();

/* -------------------------------------------------
   GET iOS Services
------------------------------------------------- */
router.get("/", async (req, res) => {
  const query = `
    SELECT Service1, Service2, Service3, Service4
    FROM ios_development
    ORDER BY id DESC
    LIMIT 1
  `;

  try {
    const [rows] = await db.query(query);

    if (!rows.length) {
      return res.status(200).json([]); // Return empty array if no data
    }

    const { Service1, Service2, Service3, Service4 } = rows[0];

    // Only return non-empty services
    const services = [Service1, Service2, Service3, Service4].filter(Boolean);

    res.status(200).json(services);
  } catch (error) {
    console.error("❌ Database error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
