import express from "express";
import db from "../db/ConnectDB.js";

const router = express.Router();

/* ---------------------------------------------------------
   FETCH ALL REVIEWS
--------------------------------------------------------- */
router.get("/", (req, res) => {
  db.query("SELECT * FROM reviews ORDER BY id DESC", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

/* ---------------------------------------------------------
   FETCH SINGLE REVIEW
--------------------------------------------------------- */
router.get("/:id", (req, res) => {
  db.query(
    "SELECT * FROM reviews WHERE id = ?",
    [req.params.id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results[0]);
    }
  );
});

/* ---------------------------------------------------------
   ADD REVIEW
--------------------------------------------------------- */
router.post("/", (req, res) => {
  const { Name, Review } = req.body;

  db.query(
    "INSERT INTO reviews (Name, Review) VALUES (?, ?)",
    [Name, Review],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });

      res.json({ message: "Review added successfully", id: result.insertId });
    }
  );
});

/* ---------------------------------------------------------
   UPDATE REVIEW
--------------------------------------------------------- */
router.put("/:id", (req, res) => {
  const { Name, Review } = req.body;

  db.query(
    "UPDATE reviews SET Name = ?, Review = ? WHERE id = ?",
    [Name, Review, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err });

      res.json({ message: "Review updated successfully" });
    }
  );
});

/* ---------------------------------------------------------
   DELETE REVIEW
--------------------------------------------------------- */
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM reviews WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });

    res.json({ message: "Review deleted successfully" });
  });
});

export default router;
