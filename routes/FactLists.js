import express from "express";
import db from "../db/ConnectDB.js";

const router = express.Router();

/* ------------------------------------------
   GET ALL FACTS
------------------------------------------ */
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, Name AS name, Count AS count, Image AS image_url FROM facts",
    );
    res.status(200).json(rows);
  } catch (err) {
    console.error("GET /facts Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
