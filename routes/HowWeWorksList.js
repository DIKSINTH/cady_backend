import express from "express";
import db from "../db/ConnectDB.js";

const router = express.Router();

/* ---------------------------------
   GET ALL HOW_WE_WORKS ENTRIES
---------------------------------- */
router.get("/", async (req, res) => {
  const query =
    "SELECT id, Name AS name, Description AS description, Image AS image_url FROM how_we_works ORDER BY id ASC";

  try {
    const [rows] = await db.query(query);

    res.status(200).json(rows); // return array (empty if no rows)
  } catch (error) {
    console.error("❌ Database error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
