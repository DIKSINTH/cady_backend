import express from "express";
import db from "../db/ConnectDB.js";

const router = express.Router();

/**
 * GET /api/logo-bottom-description
 * Returns the bottom description for logo design
 */
router.get("/", async (req, res) => {
  const sql = "SELECT Bottom_Description FROM logo_design LIMIT 1";

  try {
    const [rows] = await db.query(sql);

    if (!rows.length || !rows[0].Bottom_Description) {
      return res.status(200).json({ description: "" }); // gracefully return empty string if none
    }

    res.status(200).json({ description: rows[0].Bottom_Description });
  } catch (error) {
    console.error("❌ Database error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
