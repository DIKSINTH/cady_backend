import express from "express";
import pool from "../db/ConnectDB.js"; // promise-based pool
import upload from "../config/multer.js";
import fs from "fs/promises";
import path from "path";

const router = express.Router();

// GET first testimonial content row
router.get("/", async (req, res) => {
  try {
    const [results] = await pool.query(
      "SELECT * FROM testimonial_content LIMIT 1",
    );

    if (!results.length) {
      return res.status(404).json({ error: "No content found" });
    }

    res.json(results[0]);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Database error" });
  }
});

// UPDATE (image required)
router.put("/", upload.single("Image"), async (req, res) => {
  try {
    const { Heading, Content } = req.body;
    const newImage = req.file?.filename;

    if (!newImage) {
      return res.status(400).json({ error: "Image is required" });
    }

    // Get old image filename
    const [rows] = await pool.query(
      "SELECT Image FROM testimonial_content LIMIT 1",
    );
    const oldImage = rows[0]?.Image;

    // Delete old image if exists
    if (oldImage) {
      const oldPath = path.join(process.cwd(), "uploads", oldImage);
      try {
        await fs.unlink(oldPath);
      } catch (err) {
        // ignore if file does not exist
      }
    }

    // Update row
    await pool.query(
      "UPDATE testimonial_content SET Heading=?, Content=?, Image=? LIMIT 1",
      [Heading, Content, newImage],
    );

    res.json({ message: "Updated successfully" });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Database error" });
  }
});

export default router;
