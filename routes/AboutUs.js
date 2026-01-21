import express from "express";
import db from "../db/ConnectDB.js";
import upload from "../config/multer.js";
import fs from "fs";

const router = express.Router();

// ------------------ READ ------------------
router.get("/", (req, res) => {
  db.query("SELECT * FROM about_us LIMIT 1", (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result[0] || {});
  });
});

// ------------------ UPDATE ------------------
router.put("/", upload.single("Image"), (req, res) => {
  const {
    Description,
    Scroll_Content,
    About,
    Vision,
    Mission,
    Value1,
    Value2,
    Value3,
    Value4,
  } = req.body;

  let sql = `UPDATE about_us SET 
    Description=?, Scroll_Content=?, About=?, Vision=?, Mission=?, 
    Value1=?, Value2=?, Value3=?, Value4=?`;
  const params = [
    Description,
    Scroll_Content,
    About,
    Vision,
    Mission,
    Value1,
    Value2,
    Value3,
    Value4,
  ];

  if (req.file) {
    sql += `, Image=?`;
    params.push("/uploads/" + req.file.filename);

    // Delete old image
    db.query("SELECT Image FROM about_us LIMIT 1", (err, result) => {
      if (!err && result[0]?.Image && fs.existsSync(result[0].Image)) {
        fs.unlinkSync(result[0].Image);
      }
    });
  }

  db.query(sql, params, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Updated successfully" });
  });
});

export default router;
