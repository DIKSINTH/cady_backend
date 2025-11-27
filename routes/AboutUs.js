import express from "express";
import db from "../db/ConnectDB.js";
import upload from "../config/multer.js";

const router = express.Router();

// GET About Us
router.get("/", (req, res) => {
  const sql = "SELECT * FROM about_us WHERE id = 1";
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: err });

    if (!result[0]) return res.status(404).json({ error: "No data found" });

    const data = result[0];
    data.image = data.image ? `http://localhost:5000${data.image}` : null;

    res.json(data);
  });
});

// UPDATE About Us
router.put("/", upload.single("image"), (req, res) => {
  const { description, scrollContent } = req.body;
  let newImage = req.file ? `/uploads/${req.file.filename}` : null;

  // Get existing image if no new image uploaded
  const sqlGet = "SELECT image FROM about_us WHERE id = 1";
  db.query(sqlGet, (err, result) => {
    if (err) return res.status(500).json({ error: err });

    // If there was an existing DB value, and no new image uploaded, keep it
    if (!newImage) newImage = result[0] ? result[0].image : null;

    const sqlUpdate =
      "UPDATE about_us SET description=?, scrollContent=?, image=? WHERE id=1";
    db.query(sqlUpdate, [description, scrollContent, newImage], (err) => {
      if (err) return res.status(500).json({ error: err });

      res.json({ message: "Updated Successfully!" });
    });
  });
});

export default router;
