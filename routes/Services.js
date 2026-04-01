import express from "express";
import pool from "../db/ConnectDB.js"; // promise-based pool
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();

/* -------------------------------
   Multer Storage for Jodit Upload
--------------------------------*/
const joditStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage: joditStorage });

/* ---------------------------------------------
   JODIT IMAGE UPLOAD
--------------------------------------------- */
router.post("/upload-image", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.json({ success: false, message: "Upload failed" });
  }

  res.json({
    success: true,
    file: {
      url: `http://localhost:5000/uploads/${req.file.filename}`,
    },
  });
});

/* ---------------------------------------------
   FETCH ALL SERVICES
--------------------------------------------- */
router.get("/", async (req, res) => {
  try {
    const [services] = await pool.query(
      "SELECT id, Name, Description, Image, URL FROM services ORDER BY id DESC",
    );
    res.json(services);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
});

/* ---------------------------------------------
   FETCH SINGLE SERVICE
--------------------------------------------- */
router.get("/:id", async (req, res) => {
  try {
    const [results] = await pool.query("SELECT * FROM services WHERE id = ?", [
      req.params.id,
    ]);
    if (!results.length)
      return res.status(404).json({ message: "Service not found" });

    res.json(results[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
});

/* ---------------------------------------------
   ADD SERVICE
--------------------------------------------- */
router.post("/", upload.single("Image"), async (req, res) => {
  try {
    const { Name, Description, URL } = req.body;
    const Image = req.file ? req.file.filename : null;

    const [result] = await pool.query(
      "INSERT INTO services (Name, Description, Image, URL) VALUES (?, ?, ?, ?)",
      [Name, Description, Image, URL],
    );

    res.json({
      message: "Service added successfully",
      id: result.insertId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
});

/* ---------------------------------------------
   UPDATE SERVICE
--------------------------------------------- */
router.put("/:id", upload.single("Image"), async (req, res) => {
  try {
    const { Name, Description, URL } = req.body;

    // Fetch old image to delete if replaced
    let oldImage;
    if (req.file) {
      const [rows] = await pool.query(
        "SELECT Image FROM services WHERE id = ?",
        [req.params.id],
      );
      oldImage = rows[0]?.Image;
    }

    const sql = req.file
      ? "UPDATE services SET Name=?, Description=?, Image=?, URL=? WHERE id=?"
      : "UPDATE services SET Name=?, Description=?, URL=? WHERE id=?";

    const params = req.file
      ? [Name, Description, req.file.filename, URL, req.params.id]
      : [Name, Description, URL, req.params.id];

    await pool.query(sql, params);

    // Delete old image if replaced
    if (req.file && oldImage) {
      const oldPath = path.join(process.cwd(), "uploads", oldImage);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    res.json({ message: "Service updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
});

/* ---------------------------------------------
   DELETE SERVICE
--------------------------------------------- */
router.delete("/:id", async (req, res) => {
  try {
    // Fetch image to delete
    const [rows] = await pool.query("SELECT Image FROM services WHERE id=?", [
      req.params.id,
    ]);
    const image = rows[0]?.Image;

    await pool.query("DELETE FROM services WHERE id=?", [req.params.id]);

    if (image) {
      const imgPath = path.join(process.cwd(), "uploads", image);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }

    res.json({ message: "Service deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
});

export default router;
