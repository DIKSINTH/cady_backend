import express from "express";
import fs from "fs";
import db from "../db/ConnectDB.js";
import upload from "../config/multer.js";

const router = express.Router();

/* ------------------------------------------
   GET ALL FACTS (4 fixed rows)
------------------------------------------ */
router.get("/", (req, res) => {
  db.query("SELECT * FROM facts ORDER BY id ASC", (err, rows) => {
    if (err) return res.status(500).json({ error: err });
    res.json(rows);
  });
});

/* ------------------------------------------
   GET ONE FACT BY ID
------------------------------------------ */
router.get("/:id", (req, res) => {
  db.query("SELECT * FROM facts WHERE id = ?", [req.params.id], (err, rows) => {
    if (err) return res.status(500).json({ error: err });
    if (rows.length === 0)
      return res.status(404).json({ error: "Fact not found" });

    res.json(rows[0]);
  });
});

/* ------------------------------------------
   UPDATE FACT ONLY (Name, Count, Image)
------------------------------------------ */
router.put("/update/:id", upload.single("Image"), (req, res) => {
  const { Name, Count } = req.body;

  db.query(
    "SELECT Image FROM facts WHERE id = ?",
    [req.params.id],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err });
      if (rows.length === 0)
        return res.status(404).json({ error: "Fact not found" });

      let oldImage = rows[0].Image;
      let newImage = oldImage;

      if (req.file) {
        newImage = req.file.filename;
        const oldPath = "uploads/" + oldImage;
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }

      db.query(
        "UPDATE facts SET Name=?, Count=?, Image=? WHERE id=?",
        [Name, Count, newImage, req.params.id],
        (err2) => {
          if (err2) return res.status(500).json({ error: err2 });
          res.json({ message: "Fact updated successfully" });
        }
      );
    }
  );
});

export default router;
