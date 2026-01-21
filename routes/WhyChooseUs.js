import express from "express";
import db from "../db/ConnectDB.js";
import upload from "../config/multer.js"; // handles image upload

const router = express.Router();

/* -----------------------------------------
   FETCH ALL WHY CHOOSE US
----------------------------------------- */
router.get("/", (req, res) => {
  db.query("SELECT * FROM why_choose_us ORDER BY id DESC", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

/* -----------------------------------------
   FETCH SINGLE ITEM
----------------------------------------- */
router.get("/:id", (req, res) => {
  db.query(
    "SELECT * FROM why_choose_us WHERE id = ?",
    [req.params.id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results[0]);
    }
  );
});

/* -----------------------------------------
   ADD NEW WHY CHOOSE US ITEM
----------------------------------------- */
router.post("/", upload.single("Image"), (req, res) => {
  const { Name, Description } = req.body;

  if (!req.file) {
    return res.status(400).json({ error: "Image upload failed" });
  }

  const Image = req.file.filename;

  db.query(
    "INSERT INTO why_choose_us (Name, Description, Image) VALUES (?, ?, ?)",
    [Name, Description, Image],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });

      res.json({
        message: "Item added successfully",
        id: result.insertId,
      });
    }
  );
});

/* -----------------------------------------
   UPDATE WHY CHOOSE US ITEM
----------------------------------------- */
router.put("/:id", upload.single("Image"), (req, res) => {
  const { Name, Description } = req.body;

  let sql;
  let params;

  if (req.file) {
    sql =
      "UPDATE why_choose_us SET Name = ?, Description = ?, Image = ? WHERE id = ?";
    params = [Name, Description, req.file.filename, req.params.id];
  } else {
    sql = "UPDATE why_choose_us SET Name = ?, Description = ? WHERE id = ?";
    params = [Name, Description, req.params.id];
  }

  db.query(sql, params, (err) => {
    if (err) return res.status(500).json({ error: err });

    res.json({ message: "Item updated successfully" });
  });
});

/* -----------------------------------------
   DELETE ITEM
----------------------------------------- */
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM why_choose_us WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });

    res.json({ message: "Item deleted successfully" });
  });
});

export default router;
