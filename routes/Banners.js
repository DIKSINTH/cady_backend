import express from "express";
import db from "../db/ConnectDB.js";
import upload from "../config/multer.js"; // handles image upload

const router = express.Router();

/* ---------------------------------------------------------
   FETCH ALL BANNERS
--------------------------------------------------------- */
router.get("/", (req, res) => {
  db.query("SELECT * FROM banners ORDER BY id DESC", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

/* ---------------------------------------------------------
   FETCH SINGLE BANNER BY ID
--------------------------------------------------------- */
router.get("/:id", (req, res) => {
  db.query(
    "SELECT * FROM banners WHERE id = ?",
    [req.params.id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results[0]);
    }
  );
});

/* ---------------------------------------------------------
   ADD NEW BANNER
--------------------------------------------------------- */
router.post("/", upload.single("Image"), (req, res) => {
  const { Title, Description } = req.body;

  if (!req.file) {
    return res.status(400).json({ error: "Image upload failed" });
  }

  const Image = req.file.filename;

  db.query(
    "INSERT INTO banners (Title, Description, Image) VALUES (?, ?, ?)",
    [Title, Description, Image],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });

      res.json({
        message: "Banner added successfully",
        id: result.insertId,
      });
    }
  );
});

/* ---------------------------------------------------------
   UPDATE BANNER
--------------------------------------------------------- */
router.put("/:id", upload.single("Image"), (req, res) => {
  const { Title, Description } = req.body;

  let sql;
  let params;

  if (req.file) {
    // Update with a new image
    sql =
      "UPDATE banners SET Title = ?, Description = ?, Image = ? WHERE id = ?";
    params = [Title, Description, req.file.filename, req.params.id];
  } else {
    // Update without changing the image
    sql = "UPDATE banners SET Title = ?, Description = ? WHERE id = ?";
    params = [Title, Description, req.params.id];
  }

  db.query(sql, params, (err) => {
    if (err) return res.status(500).json({ error: err });

    res.json({ message: "Banner updated successfully" });
  });
});

/* ---------------------------------------------------------
   DELETE BANNER
--------------------------------------------------------- */
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM banners WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });

    res.json({ message: "Banner deleted successfully" });
  });
});

export default router;
