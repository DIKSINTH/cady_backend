import express from "express";
import db from "../db/ConnectDB.js";

const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!Number.isInteger(Number(id))) {
      return res.status(400).json({ error: "Invalid blog ID" });
    }

    const [rows] = await db.execute(
      `SELECT Name AS name, Description AS description, Image AS image 
       FROM blog 
       WHERE id = ? 
       LIMIT 1`,
      [id],
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Blog not found" });
    }

    return res.json(rows[0]);
  } catch (error) {
    console.error("Blog Fetch Error:", error);
    return res.status(500).json({ error: "Server error" });
  }
});

export default router;
