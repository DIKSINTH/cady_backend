import express from "express";
import fs from "fs/promises";
import path from "path";
import db from "../db/ConnectDB.js";
import upload from "../config/multer.js";

const router = express.Router();
const UPLOAD_DIR = path.join(process.cwd(), "uploads");

// -----------------------------
// GET ALL LOGOS
// -----------------------------
router.get("/", async (req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM logo ORDER BY id ASC");
    res.json(results);
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// -----------------------------
// GET SINGLE LOGO
// -----------------------------
router.get("/:id", async (req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM logo WHERE id = ?", [
      req.params.id,
    ]);
    if (!results.length)
      return res.status(404).json({ error: "Logo not found" });
    res.json(results[0]);
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// -----------------------------
// ADD LOGO
// -----------------------------
router.post("/add", upload.single("logo"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  try {
    await db.query("INSERT INTO logo (Image) VALUES (?)", [req.file.filename]);
    res.json({ message: "Logo added successfully" });
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// -----------------------------
// UPDATE LOGO
// -----------------------------
router.put("/update/:id", upload.single("logo"), async (req, res) => {
  if (!req.file)
    return res.status(400).json({ error: "No new image uploaded" });

  try {
    const [results] = await db.query("SELECT Image FROM logo WHERE id = ?", [
      req.params.id,
    ]);
    if (!results.length)
      return res.status(404).json({ error: "Logo not found" });

    const oldFile = results[0].Image;
    const oldPath = path.join(UPLOAD_DIR, oldFile);

    // Delete old file if exists
    try {
      await fs.unlink(oldPath);
    } catch (e) {
      // ignore if file does not exist
    }

    await db.query("UPDATE logo SET Image = ? WHERE id = ?", [
      req.file.filename,
      req.params.id,
    ]);

    res.json({ message: "Logo updated successfully" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// -----------------------------
// DELETE LOGO
// -----------------------------
router.delete("/delete/:id", async (req, res) => {
  try {
    const [results] = await db.query("SELECT Image FROM logo WHERE id = ?", [
      req.params.id,
    ]);
    if (!results.length)
      return res.status(404).json({ error: "Logo not found" });

    const filePath = path.join(UPLOAD_DIR, results[0].Image);
    try {
      await fs.unlink(filePath);
    } catch (e) {
      // ignore if file does not exist
    }

    await db.query("DELETE FROM logo WHERE id = ?", [req.params.id]);

    res.json({ message: "Logo deleted successfully" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

export default router;
