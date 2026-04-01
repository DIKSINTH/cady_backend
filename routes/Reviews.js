import express from "express";
import pool from "../db/ConnectDB.js"; // promise-based MySQL pool

const router = express.Router();

/* ---------------------------------------------------------
   FETCH ALL REVIEWS
--------------------------------------------------------- */
router.get("/", async (req, res) => {
  try {
    const [reviews] = await pool.query(
      "SELECT * FROM reviews ORDER BY id DESC",
    );
    res.json(reviews);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});

/* ---------------------------------------------------------
   FETCH SINGLE REVIEW
--------------------------------------------------------- */
router.get("/:id", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM reviews WHERE id = ?", [
      req.params.id,
    ]);

    if (!rows.length)
      return res.status(404).json({ message: "Review not found" });

    res.json(rows[0]);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Failed to fetch review" });
  }
});

/* ---------------------------------------------------------
   ADD REVIEW
--------------------------------------------------------- */
router.post("/", async (req, res) => {
  try {
    const { Name, Review } = req.body;

    const [result] = await pool.query(
      "INSERT INTO reviews (Name, Review) VALUES (?, ?)",
      [Name, Review],
    );

    res.json({ message: "Review added successfully", id: result.insertId });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Failed to add review" });
  }
});

/* ---------------------------------------------------------
   UPDATE REVIEW
--------------------------------------------------------- */
router.put("/:id", async (req, res) => {
  try {
    const { Name, Review } = req.body;

    const [result] = await pool.query(
      "UPDATE reviews SET Name = ?, Review = ? WHERE id = ?",
      [Name, Review, req.params.id],
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Review not found" });

    res.json({ message: "Review updated successfully" });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Failed to update review" });
  }
});

/* ---------------------------------------------------------
   DELETE REVIEW
--------------------------------------------------------- */
router.delete("/:id", async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM reviews WHERE id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Review not found" });

    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Failed to delete review" });
  }
});

export default router;
