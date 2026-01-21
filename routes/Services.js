import express from "express";
import db from "../db/ConnectDB.js";
import upload from "../config/multer.js";
import multer from "multer";
import path from "path";

const router = express.Router();

/* ---------------------------------------------
   JODIT IMAGE UPLOAD (if needed)
--------------------------------------------- */
const joditStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const joditUpload = multer({ storage: joditStorage });

router.post("/upload-image", joditUpload.single("file"), (req, res) => {
  if (!req.file) {
    return res.json({ success: false, message: "Upload failed" });
  }

  return res.json({
    success: true,
    file: {
      url: `http://localhost:5000/uploads/${req.file.filename}`,
    },
  });
});

/* ---------------------------------------------
   FETCH ALL SERVICES (VIEW PAGE)
--------------------------------------------- */
router.get("/", (req, res) => {
  db.query(
    "SELECT id, Name, Description, Image, URL FROM services ORDER BY id DESC",
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results);
    }
  );
});

/* ---------------------------------------------
   FETCH SINGLE SERVICE (EDIT PAGE)
--------------------------------------------- */
router.get("/:id", (req, res) => {
  db.query(
    "SELECT * FROM services WHERE id = ?",
    [req.params.id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results[0]);
    }
  );
});

/* ---------------------------------------------
   ADD SERVICE
--------------------------------------------- */
router.post("/", upload.single("Image"), (req, res) => {
  const { Name, Description, URL } = req.body;
  const Image = req.file ? req.file.filename : null;

  db.query(
    "INSERT INTO services (Name, Description, Image, URL) VALUES (?, ?, ?, ?)",
    [Name, Description, Image, URL],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });

      res.json({
        message: "Service added successfully",
        id: result.insertId,
      });
    }
  );
});

/* ---------------------------------------------
   UPDATE SERVICE
--------------------------------------------- */
router.put("/:id", upload.single("Image"), (req, res) => {
  const { Name, Description, URL } = req.body;

  let sql;
  let params;

  if (req.file) {
    sql =
      "UPDATE services SET Name = ?, Description = ?, Image = ?, URL = ? WHERE id = ?";
    params = [Name, Description, req.file.filename, URL, req.params.id];
  } else {
    sql = "UPDATE services SET Name = ?, Description = ?, URL = ? WHERE id = ?";
    params = [Name, Description, URL, req.params.id];
  }

  db.query(sql, params, (err) => {
    if (err) return res.status(500).json({ error: err });

    res.json({ message: "Service updated successfully" });
  });
});

/* ---------------------------------------------
   DELETE SERVICE
--------------------------------------------- */
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM services WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });

    res.json({ message: "Service deleted successfully" });
  });
});

export default router;
