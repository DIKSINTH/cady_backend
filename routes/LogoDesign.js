import express from "express";
import db from "../db/ConnectDB.js";
import upload from "../config/multer.js";

const router = express.Router();

/* ---------------------------------
        GET (load row id=1)
---------------------------------- */
router.get("/", (req, res) => {
  const sql = "SELECT * FROM logo_design WHERE id=1";

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length === 0) {
      return res.json({});
    }

    res.json(result[0]);
  });
});

/* ---------------------------------
        UPDATE LOGO DESIGN
---------------------------------- */
router.put("/update", upload.single("Image"), (req, res) => {
  const body = req.body;
  const newImage = req.file ? req.file.filename : null;

  let fields = [];
  let values = [];

  Object.keys(body).forEach((key) => {
    fields.push(`${key}=?`);
    values.push(body[key]);
  });

  if (newImage) {
    fields.push("Image=?");
    values.push(newImage);
  }

  const sql = `UPDATE logo_design SET ${fields.join(", ")} WHERE id=1`;

  db.query(sql, values, (err) => {
    if (err) return res.status(500).json(err);

    res.json({
      success: true,
      message: "Logo Design updated successfully",
    });
  });
});

export default router;
