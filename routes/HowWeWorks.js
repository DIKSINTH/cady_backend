import express from "express";
import db from "../db/ConnectDB.js";
import upload from "../config/multer.js";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();

/* ---------------------------------
   JODIT IMAGE UPLOAD
--------------------------------- */
const joditStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const joditUpload = multer({ storage: joditStorage });

router.post("/upload-image", joditUpload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "Upload failed" });
  }
  res.json({
    success: true,
    file: { url: `/uploads/${req.file.filename}` },
  });
});

/* ---------------------------------
   GET ALL ENTRIES
--------------------------------- */
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, Name, Description, Image, URL FROM how_we_works ORDER BY id DESC",
    );
    res.json(rows);
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

/* ---------------------------------
   GET SINGLE ENTRY
--------------------------------- */
router.get("/:id", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM how_we_works WHERE id = ?", [
      req.params.id,
    ]);

    if (!rows.length) return res.status(404).json({ message: "Not found" });

    res.json(rows[0]);
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

/* ---------------------------------
   ADD NEW ENTRY
--------------------------------- */
router.post("/", upload.single("Image"), async (req, res) => {
  const { Name, Description, URL } = req.body;
  const Image = req.file ? req.file.filename : null;

  try {
    const [result] = await db.query(
      "INSERT INTO how_we_works (Name, Description, Image, URL) VALUES (?, ?, ?, ?)",
      [Name, Description, Image, URL],
    );
    res
      .status(201)
      .json({ message: "Added successfully", id: result.insertId });
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

/* ---------------------------------
   UPDATE ENTRY
--------------------------------- */
router.put("/:id", upload.single("Image"), async (req, res) => {
  const { Name, Description, URL } = req.body;

  try {
    // If a new image is uploaded, get old image to delete
    let params = [Name, Description, URL, req.params.id];
    let sql = "UPDATE how_we_works SET Name=?, Description=?, URL=? WHERE id=?";

    if (req.file) {
      // Delete old image
      const [oldRows] = await db.query(
        "SELECT Image FROM how_we_works WHERE id=?",
        [req.params.id],
      );
      const oldImage = oldRows[0]?.Image;
      if (oldImage && fs.existsSync(`uploads/${oldImage}`)) {
        fs.unlinkSync(`uploads/${oldImage}`);
      }

      sql =
        "UPDATE how_we_works SET Name=?, Description=?, Image=?, URL=? WHERE id=?";
      params = [Name, Description, req.file.filename, URL, req.params.id];
    }

    await db.query(sql, params);
    res.json({ message: "Updated successfully" });
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

/* ---------------------------------
   DELETE ENTRY
--------------------------------- */
router.delete("/:id", async (req, res) => {
  try {
    // Delete image file if exists
    const [rows] = await db.query("SELECT Image FROM how_we_works WHERE id=?", [
      req.params.id,
    ]);
    const image = rows[0]?.Image;
    if (image && fs.existsSync(`uploads/${image}`)) {
      fs.unlinkSync(`uploads/${image}`);
    }

    await db.query("DELETE FROM how_we_works WHERE id=?", [req.params.id]);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
