import express from "express";
import db from "../db/ConnectDB.js";
import upload from "../config/multer.js";
import fs from "fs";
import path from "path";

const router = express.Router();

/* --------------------------------------
   GET Blog Content (single row)
--------------------------------------- */
router.get("/", async (req, res) => {
  try {
    const sql = "SELECT * FROM blog_content LIMIT 1";
    const [rows] = await db.query(sql);

    if (!rows.length) {
      return res.status(404).json({ error: "No content found" });
    }

    res.status(200).json(rows[0]);
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

/* --------------------------------------
   UPDATE Blog Content (image required)
--------------------------------------- */
router.put("/", upload.single("Image"), async (req, res) => {
  try {
    const { Heading, Content } = req.body;
    const newImage = req.file?.filename;

    if (!newImage) {
      return res.status(400).json({ error: "Image is required" });
    }

    // Get old image
    const selectSql = "SELECT Image FROM blog_content LIMIT 1";
    const [rows] = await db.query(selectSql);
    const oldImage = rows[0]?.Image;

    // Delete old image safely
    if (oldImage) {
      const oldPath = path.join(process.cwd(), "uploads", oldImage);

      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }

    // Update DB
    const updateSql =
      "UPDATE blog_content SET Heading=?, Content=?, Image=? LIMIT 1";

    await db.query(updateSql, [Heading, Content, newImage]);

    res.status(200).json({
      message: "Blog content updated successfully",
    });
  } catch (err) {
    console.error("DB Update Error:", err);
    res.status(500).json({ error: "Failed to update content" });
  }
});

export default router;
