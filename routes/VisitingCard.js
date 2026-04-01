import express from "express";
import pool from "../db/ConnectDB.js"; // Promise-based pool
import upload from "../config/multer.js";

const router = express.Router();

/* -----------------------------
   GET Visiting Card
------------------------------ */
router.get("/", async (req, res) => {
  try {
    const sql = "SELECT * FROM visiting_card ORDER BY id ASC LIMIT 1";
    const [results] = await pool.query(sql);

    if (results.length === 0) return res.json({}); // return empty object if no record

    res.json(results[0]);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Database error" });
  }
});

/* -----------------------------
   UPDATE Visiting Card
------------------------------ */
router.put("/update/:id", upload.single("Image"), async (req, res) => {
  try {
    const id = req.params.id;
    const fields = req.body;
    const newImage = req.file ? req.file.filename : null;

    const updateFields = [];
    const values = [];

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

    values.push(id); // Add ID for WHERE clause

    const sql = `UPDATE visiting_card SET ${updateFields.join(", ")} WHERE id=?`;
    await pool.query(sql, values);

    res.json({ success: true, message: "Visiting Card updated successfully" });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Database error" });
  }
});

export default router;
