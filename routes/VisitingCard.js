import express from "express";
import db from "../db/ConnectDB.js";
import upload from "../config/multer.js";

const router = express.Router();

/* -----------------------------
   GET Visiting Card
------------------------------ */
router.get("/", (req, res) => {
  const sql = "SELECT * FROM visiting_card ORDER BY id ASC LIMIT 1";

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length === 0) return res.json({}); // empty if no record

    res.json(result[0]);
  });
});

/* -----------------------------
   UPDATE Visiting Card
------------------------------ */
router.put("/update/:id", upload.single("Image"), (req, res) => {
  const id = req.params.id;
  const fields = req.body;
  const newImage = req.file ? req.file.filename : null;

  let updateFields = [];
  let values = [];

  Object.keys(fields).forEach((key) => {
    if (fields[key] !== undefined && fields[key] !== null) {
      updateFields.push(`${key}=?`);
      values.push(fields[key]);
    }
  });

  if (newImage) {
    updateFields.push("Image=?");
    values.push(newImage);
  }

  if (updateFields.length === 0) {
    return res.json({ success: false, message: "No fields to update" });
  }

  values.push(id); // use real ID

  const sql = `UPDATE visiting_card SET ${updateFields.join(", ")} WHERE id=?`;

  db.query(sql, values, (err) => {
    if (err) return res.status(500).json(err);

    res.json({ success: true, message: "Visiting Card updated successfully" });
  });
});

export default router;
