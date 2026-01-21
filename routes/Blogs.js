import express from "express";
import db from "../db/ConnectDB.js";
import upload from "../config/multer.js"; // For main blog image
import multer from "multer";
import path from "path";

const router = express.Router();

/* ---------------------------------------------------------
   STATIC FOLDER ENSURE
--------------------------------------------------------- */
// IMPORTANT: This must be in server.js, NOT here:
// app.use("/uploads", express.static("uploads"));

/* ---------------------------------------------------------
   JODIT IMAGE UPLOAD (WORKING + FIXED)
--------------------------------------------------------- */
const joditStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
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
      url: `http://localhost:5000/uploads/${req.file.filename}`,
    },
  });
});

/* ---------------------------------------------------------
   FETCH ALL BLOGS
--------------------------------------------------------- */
router.get("/", (req, res) => {
  db.query("SELECT * FROM blog ORDER BY id DESC", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

/* ---------------------------------------------------------
   FETCH SINGLE BLOG
--------------------------------------------------------- */
router.get("/:id", (req, res) => {
  db.query(
    "SELECT * FROM blog WHERE id = ?",
    [req.params.id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results[0]);
    }
  );
});

/* ---------------------------------------------------------
   ADD BLOG
--------------------------------------------------------- */
router.post("/", upload.single("Image"), (req, res) => {
  const { Name, Description } = req.body;

  if (!req.file) {
    return res.status(400).json({ error: "Image upload failed" });
  }

  const Image = req.file.filename;

  db.query(
    "INSERT INTO blog (Name, Description, Image) VALUES (?, ?, ?)",
    [Name, Description, Image],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });

      res.json({
        message: "Blog added successfully",
        id: result.insertId,
      });
    }
  );
});

/* ---------------------------------------------------------
   UPDATE BLOG
--------------------------------------------------------- */
router.put("/:id", upload.single("Image"), (req, res) => {
  const { Name, Description } = req.body;

  let sql;
  let params;

  if (req.file) {
    sql = "UPDATE blog SET Name = ?, Description = ?, Image = ? WHERE id = ?";
    params = [Name, Description, req.file.filename, req.params.id];
  } else {
    sql = "UPDATE blog SET Name = ?, Description = ? WHERE id = ?";
    params = [Name, Description, req.params.id];
  }

  db.query(sql, params, (err) => {
    if (err) return res.status(500).json({ error: err });

    res.json({ message: "Blog updated successfully" });
  });
});

/* ---------------------------------------------------------
   DELETE BLOG
--------------------------------------------------------- */
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM blog WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });

    res.json({ message: "Blog deleted successfully" });
  });
});

export default router;
