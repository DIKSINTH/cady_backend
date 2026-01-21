import express from "express";
import db from "../db/ConnectDB.js";
import upload from "../config/multer.js";
import fs from "fs";
import path from "path";

const router = express.Router();

// GET first testimonial content row
router.get("/", (req, res) => {
  db.query("SELECT * FROM testimonial_content LIMIT 1", (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (!result.length)
      return res.status(404).json({ error: "No content found" });

    res.json(result[0]);
  });
});

// UPDATE (image required)
router.put("/", upload.single("Image"), (req, res) => {
  const { Heading, Content } = req.body;
  const newImage = req.file?.filename;

  if (!newImage) {
    return res.status(400).json({ error: "Image is required" });
  }

  db.query("SELECT Image FROM testimonial_content LIMIT 1", (err, rows) => {
    if (err) return res.status(500).json({ error: err });

    const oldImage = rows[0]?.Image;

    // Delete old image
    if (oldImage) {
      const oldPath = path.join(process.cwd(), "uploads", oldImage);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    const sql =
      "UPDATE testimonial_content SET Heading=?, Content=?, Image=? LIMIT 1";

    db.query(sql, [Heading, Content, newImage], (err2) => {
      if (err2) return res.status(500).json({ error: err2 });

      res.json({ message: "Updated successfully" });
    });
  });
});

export default router;
