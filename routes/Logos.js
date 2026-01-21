import express from "express";
import fs from "fs";
import db from "../db/ConnectDB.js";
import upload from "../config/multer.js";

const router = express.Router();

// GET ALL LOGOS
router.get("/", (req, res) => {
  const sql = "SELECT * FROM logo ORDER BY id ASC";
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
});

// GET ONE LOGO
router.get("/:id", (req, res) => {
  const sql = "SELECT * FROM logo WHERE id = ?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.length === 0)
      return res.status(404).json({ error: "Not found" });

    res.json(result[0]);
  });
});

// ADD LOGO
router.post("/add", upload.single("logo"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  const sql = "INSERT INTO logo (Image) VALUES (?)";
  db.query(sql, [req.file.filename], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Logo added successfully" });
  });
});

// UPDATE LOGO
router.put("/update/:id", upload.single("logo"), (req, res) => {
  if (!req.file)
    return res.status(400).json({ message: "No new image uploaded" });

  const newLogo = req.file.filename;

  db.query(
    "SELECT Image FROM logo WHERE id = ?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      if (result.length === 0)
        return res.status(404).json({ error: "Logo not found" });

      const oldPath = "uploads/" + result[0].Image;
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);

      db.query(
        "UPDATE logo SET Image = ? WHERE id = ?",
        [newLogo, req.params.id],
        (err2) => {
          if (err2) return res.status(500).json({ error: err2 });
          res.json({ message: "Logo updated successfully" });
        }
      );
    }
  );
});

// DELETE LOGO
router.delete("/delete/:id", (req, res) => {
  db.query(
    "SELECT Image FROM logo WHERE id = ?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      if (result.length === 0)
        return res.status(404).json({ error: "Logo not found" });

      const filePath = "uploads/" + result[0].Image;
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

      db.query("DELETE FROM logo WHERE id = ?", [req.params.id], (err2) => {
        if (err2) return res.status(500).json({ error: err2 });
        res.json({ message: "Logo deleted successfully" });
      });
    }
  );
});

export default router;
