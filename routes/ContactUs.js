import express from "express";
import db from "../db/ConnectDB.js"; // your MySQL connection file
import upload from "../config/multer.js"; // your multer file

const router = express.Router();

/* -----------------------------
   GET Contact Us (only 1 row)
-------------------------------- */
router.get("/", (req, res) => {
  const sql = "SELECT * FROM contact_us LIMIT 1";

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: err });

    if (result.length === 0) {
      return res.json({
        id: "",
        Title: "",
        Sub_Title: "",
        Image: "",
      });
    }

    res.json(result[0]);
  });
});

/* -----------------------------
   UPDATE Contact Us
-------------------------------- */
router.put("/update/:id", upload.single("image"), (req, res) => {
  const { id } = req.params;
  const { Title, Sub_Title } = req.body;

  let image = req.file ? req.file.filename : null;

  let sql = "";
  let values = [];

  if (image) {
    sql = "UPDATE contact_us SET Title=?, Sub_Title=?, Image=? WHERE id=?";
    values = [Title, Sub_Title, image, id];
  } else {
    sql = "UPDATE contact_us SET Title=?, Sub_Title=? WHERE id=?";
    values = [Title, Sub_Title, id];
  }

  db.query(sql, values, (err) => {
    if (err) return res.status(500).json(err);

    res.json({ success: true, message: "Contact Us updated successfully" });
  });
});

export default router;
