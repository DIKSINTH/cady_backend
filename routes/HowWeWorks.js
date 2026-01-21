import express from "express";
import db from "../db/ConnectDB.js";
import upload from "../config/multer.js";
import multer from "multer";
import path from "path";

const router = express.Router();

/* ------------------------------
   JODIT IMAGE UPLOAD
------------------------------ */
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
    file: { url: `http://localhost:5000/uploads/${req.file.filename}` },
  });
});

/* ------------------------------
   GET ALL (VIEW PAGE)
------------------------------ */
router.get("/", (req, res) => {
  db.query(
    "SELECT id, Name, Description, Image FROM how_we_works ORDER BY id DESC",
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results);
    }
  );
});

/* ------------------------------
   GET SINGLE (EDIT)
------------------------------ */
router.get("/:id", (req, res) => {
  db.query(
    "SELECT * FROM how_we_works WHERE id = ?",
    [req.params.id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results[0]);
    }
  );
});

/* ------------------------------
   ADD NEW
------------------------------ */
router.post("/", upload.single("Image"), (req, res) => {
  const { Name, Description, URL } = req.body;
  const Image = req.file ? req.file.filename : null;

  db.query(
    "INSERT INTO how_we_works (Name, Description, Image, URL) VALUES (?, ?, ?, ?)",
    [Name, Description, Image, URL],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });

      res.json({
        message: "How We Work added successfully",
        id: result.insertId,
      });
    }
  );
});

/* ------------------------------
   UPDATE
------------------------------ */
router.put("/:id", upload.single("Image"), (req, res) => {
  const { Name, Description, URL } = req.body;

  let sql = "";
  let params = [];

  if (req.file) {
    sql =
      "UPDATE how_we_works SET Name = ?, Description = ?, Image = ?, URL = ? WHERE id = ?";
    params = [Name, Description, req.file.filename, URL, req.params.id];
  } else {
    sql =
      "UPDATE how_we_works SET Name = ?, Description = ?, URL = ? WHERE id = ?";
    params = [Name, Description, URL, req.params.id];
  }

  db.query(sql, params, (err) => {
    if (err) return res.status(500).json({ error: err });

    res.json({ message: "How We Work updated successfully" });
  });
});

/* ------------------------------
   DELETE
------------------------------ */
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM how_we_works WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Deleted successfully" });
  });
});

export default router;
