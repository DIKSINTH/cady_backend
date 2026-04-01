import express from "express";
import db from "../db/ConnectDB.js";
import upload from "../config/multer.js";
import fs from "fs";
import path from "path";

const router = express.Router();
const UPLOAD_DIR = path.join(process.cwd(), "uploads");

/* ---------------------------------------------------------
   FETCH ALL BANNERS
--------------------------------------------------------- */
router.get("/", async (req, res) => {
  try {
    const sql = "SELECT * FROM banners ORDER BY id DESC";
    const [results] = await db.query(sql);
    res.status(200).json(results);
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

/* ---------------------------------------------------------
   FETCH SINGLE BANNER BY ID
--------------------------------------------------------- */
router.get("/:id", async (req, res) => {
  try {
    const sql = "SELECT * FROM banners WHERE id = ?";
    const [results] = await db.query(sql, [req.params.id]);

    if (!results.length)
      return res.status(404).json({ error: "Banner not found" });

    res.status(200).json(results[0]);
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

/* ---------------------------------------------------------
   ADD NEW BANNER
--------------------------------------------------------- */
router.post("/", upload.single("Image"), async (req, res) => {
  try {
    const { Title, Description } = req.body;

    if (!req.file)
      return res.status(400).json({ error: "Image upload failed" });

    const sql =
      "INSERT INTO banners (Title, Description, Image) VALUES (?, ?, ?)";

    const [result] = await db.query(sql, [
      Title,
      Description,
      req.file.filename,
    ]);

    res.status(201).json({
      message: "Banner added successfully",
      id: result.insertId,
    });
  } catch (err) {
    console.error("DB Insert Error:", err);
    res.status(500).json({ error: "Failed to add banner" });
  }
});

/* ---------------------------------------------------------
   UPDATE BANNER
--------------------------------------------------------- */
router.put("/:id", upload.single("Image"), async (req, res) => {
  try {
    const { Title, Description } = req.body;
    const bannerId = req.params.id;

    const [rows] = await db.query("SELECT Image FROM banners WHERE id = ?", [
      bannerId,
    ]);

    if (!rows.length)
      return res.status(404).json({ error: "Banner not found" });

    const oldImage = rows[0].Image;
    const newImage = req.file ? req.file.filename : oldImage;

    // Delete old image if new uploaded
    if (req.file && oldImage) {
      const oldPath = path.join(UPLOAD_DIR, oldImage);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }

    await db.query(
      "UPDATE banners SET Title=?, Description=?, Image=? WHERE id=?",
      [Title, Description, newImage, bannerId],
    );

    res.status(200).json({ message: "Banner updated successfully" });
  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({ error: "Failed to update banner" });
  }
});

/* ---------------------------------------------------------
   DELETE BANNER
--------------------------------------------------------- */
router.delete("/:id", async (req, res) => {
  try {
    const bannerId = req.params.id;

    const [rows] = await db.query("SELECT Image FROM banners WHERE id=?", [
      bannerId,
    ]);

    if (!rows.length)
      return res.status(404).json({ error: "Banner not found" });

    const image = rows[0].Image;

    if (image) {
      const imagePath = path.join(UPLOAD_DIR, image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await db.query("DELETE FROM banners WHERE id=?", [bannerId]);

    res.status(200).json({ message: "Banner deleted successfully" });
  } catch (err) {
    console.error("Delete Error:", err);
    res.status(500).json({ error: "Failed to delete banner" });
  }
});

export default router;
