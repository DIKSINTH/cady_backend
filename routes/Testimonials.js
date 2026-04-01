import express from "express";
import pool from "../db/ConnectDB.js"; // Promise-based pool
import upload from "../config/multer.js";
import path from "path";
import fs from "fs/promises"; // modern promise-based fs

const router = express.Router();

/* ---------------------------------------------------------
   FETCH ALL TESTIMONIALS
--------------------------------------------------------- */
router.get("/", async (req, res) => {
  try {
    const [results] = await pool.query(
      "SELECT * FROM testimonials ORDER BY id DESC",
    );

    const mapped = results.map((row) => ({
      id: row.id,
      name: row.Name,
      position: row.Position,
      description: row.Description,
      image: row.Image,
    }));

    res.json(mapped);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Database error" });
  }
});

/* ---------------------------------------------------------
   FETCH SINGLE TESTIMONIAL
--------------------------------------------------------- */
router.get("/:id", async (req, res) => {
  try {
    const [results] = await pool.query(
      "SELECT * FROM testimonials WHERE id = ?",
      [req.params.id],
    );

    if (results.length === 0)
      return res.status(404).json({ message: "Testimonial not found" });

    const row = results[0];

    res.json({
      id: row.id,
      name: row.Name,
      position: row.Position,
      description: row.Description,
      image: row.Image,
    });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Database error" });
  }
});

/* ---------------------------------------------------------
   ADD TESTIMONIAL
--------------------------------------------------------- */
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, position, description } = req.body;

    if (!req.file)
      return res.status(400).json({ message: "Image upload failed" });

    const [result] = await pool.query(
      "INSERT INTO testimonials (Name, Position, Description, Image) VALUES (?, ?, ?, ?)",
      [name, position, description, req.file.filename],
    );

    res.json({
      message: "Testimonial added successfully",
      id: result.insertId,
    });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Database error" });
  }
});

/* ---------------------------------------------------------
   UPDATE TESTIMONIAL
--------------------------------------------------------- */
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { name, position, description } = req.body;
    const id = req.params.id;

    // Get old image
    const [rows] = await pool.query(
      "SELECT Image FROM testimonials WHERE id = ?",
      [id],
    );
    const oldImage = rows[0]?.Image;

    // Build SQL dynamically
    const updateFields = ["Name=?", "Position=?", "Description=?"];
    const values = [name, position, description];

    if (req.file) {
      updateFields.push("Image=?");
      values.push(req.file.filename);
    }

    values.push(id); // for WHERE clause

    await pool.query(
      `UPDATE testimonials SET ${updateFields.join(", ")} WHERE id=?`,
      values,
    );

    // Remove old image if replaced
    if (req.file && oldImage) {
      const filePath = path.join(process.cwd(), "uploads", oldImage);
      fs.unlink(filePath).catch(() => {}); // ignore error if file missing
    }

    res.json({ message: "Testimonial updated successfully" });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Database error" });
  }
});

/* ---------------------------------------------------------
   DELETE TESTIMONIAL
--------------------------------------------------------- */
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    // Get image name first
    const [rows] = await pool.query(
      "SELECT Image FROM testimonials WHERE id = ?",
      [id],
    );
    const image = rows[0]?.Image;

    // Delete the row
    await pool.query("DELETE FROM testimonials WHERE id = ?", [id]);

    // Delete image file
    if (image) {
      const filePath = path.join(process.cwd(), "uploads", image);
      fs.unlink(filePath).catch(() => {});
    }

    res.json({ message: "Testimonial deleted successfully" });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Database error" });
  }
});

export default router;
