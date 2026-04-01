import express from "express";
import db from "../db/ConnectDB.js";
import upload from "../config/multer.js";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();
const UPLOAD_DIR = path.join(process.cwd(), "uploads");

/* ---------------------------------------------------------
   JODIT IMAGE UPLOAD
--------------------------------------------------------- */
const joditStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const joditUpload = multer({ storage: joditStorage });

router.post("/upload-image", joditUpload.single("file"), (req, res) => {
  if (!req.file) {
    return res.json({
      success: false,
      message: "Upload failed",
    });
  }

  return res.json({
    success: true,
    file: {
      url: `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`,
    },
  });
});

/* ---------------------------------------------------------
   FETCH ALL BLOGS
--------------------------------------------------------- */
router.get("/", async (req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM blog ORDER BY id DESC");
    res.json(results);
  } catch (err) {
    console.error("Fetch Blogs Error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

/* ---------------------------------------------------------
   FETCH SINGLE BLOG
--------------------------------------------------------- */
router.get("/:id", async (req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM blog WHERE id = ?", [
      req.params.id,
    ]);

    if (!results.length)
      return res.status(404).json({ error: "Blog not found" });

    res.json(results[0]);
  } catch (err) {
    console.error("Fetch Blog Error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

/* ---------------------------------------------------------
   ADD BLOG
--------------------------------------------------------- */
router.post("/", upload.single("Image"), async (req, res) => {
  try {
    const { Name, Description } = req.body;

    if (!req.file)
      return res.status(400).json({ error: "Image upload failed" });

    const Image = req.file.filename;

    const [result] = await db.query(
      "INSERT INTO blog (Name, Description, Image) VALUES (?, ?, ?)",
      [Name, Description, Image],
    );

    res.status(201).json({
      message: "Blog added successfully",
      id: result.insertId,
    });
  } catch (err) {
    console.error("Add Blog Error:", err);
    res.status(500).json({ error: "Failed to add blog" });
  }
});

/* ---------------------------------------------------------
   UPDATE BLOG
--------------------------------------------------------- */
router.put("/:id", upload.single("Image"), async (req, res) => {
  try {
    const { Name, Description } = req.body;
    const blogId = req.params.id;

    const [rows] = await db.query("SELECT Image FROM blog WHERE id = ?", [
      blogId,
    ]);

    if (!rows.length) return res.status(404).json({ error: "Blog not found" });

    const oldImage = rows[0].Image;
    let newImage = oldImage;

    if (req.file) {
      newImage = req.file.filename;

      // delete old image safely
      if (oldImage) {
        const oldPath = path.join(UPLOAD_DIR, oldImage);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
    }

    await db.query(
      "UPDATE blog SET Name = ?, Description = ?, Image = ? WHERE id = ?",
      [Name, Description, newImage, blogId],
    );

    res.json({ message: "Blog updated successfully" });
  } catch (err) {
    console.error("Update Blog Error:", err);
    res.status(500).json({ error: "Failed to update blog" });
  }
});

/* ---------------------------------------------------------
   DELETE BLOG
--------------------------------------------------------- */
router.delete("/:id", async (req, res) => {
  try {
    const blogId = req.params.id;

    const [rows] = await db.query("SELECT Image FROM blog WHERE id = ?", [
      blogId,
    ]);

    if (!rows.length) return res.status(404).json({ error: "Blog not found" });

    const image = rows[0].Image;

    if (image) {
      const imagePath = path.join(UPLOAD_DIR, image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await db.query("DELETE FROM blog WHERE id = ?", [blogId]);

    res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    console.error("Delete Blog Error:", err);
    res.status(500).json({ error: "Failed to delete blog" });
  }
});

export default router;
