import express from "express";
import db from "../db/ConnectDB.js";
import upload from "../config/multer.js";

const router = express.Router();

// VIEW — only Title, Description, Image
router.get("/", (req, res) => {
  db.query(
    "SELECT Title, Description, Image FROM web_design LIMIT 1",
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json(result[0]);
    }
  );
});

// EDIT — all fields
router.get("/edit", (req, res) => {
  db.query("SELECT * FROM web_design LIMIT 1", (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result[0]);
  });
});

// UPDATE — use POST instead of PUT for FormData
router.post("/update", upload.single("Image"), (req, res) => {
  const body = req.body;

  // Use new image if uploaded, else keep old
  const finalImage = req.file ? req.file.filename : body.oldImage;

  const query = `
    UPDATE web_design SET 
      Title=?, Description=?, Image=?,
      Design1=?, Design2=?, Design3=?, Design4=?, Design5=?,
      Process1=?, Process2=?, Process3=?, Process4=?, Process5=?,
      Content1=?, Content2=?
    WHERE id=1
  `;

  const params = [
    body.Title,
    body.Description,
    finalImage,
    body.Design1,
    body.Design2,
    body.Design3,
    body.Design4,
    body.Design5,
    body.Process1,
    body.Process2,
    body.Process3,
    body.Process4,
    body.Process5,
    body.Content1,
    body.Content2,
  ];

  db.query(query, params, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Updated successfully" });
  });
});

export default router;
