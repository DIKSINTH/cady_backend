import express from "express";
import db from "../db/ConnectDB.js";
import upload from "../config/multer.js";
import fs from "fs";
import path from "path";

const router = express.Router();

/* ---------------------------------
        GET Logo Design (id=1)
---------------------------------- */
router.get("/", async (req, res) => {
  const sql = "SELECT * FROM logo_design WHERE id=1";

  try {
    const [rows] = await db.query(sql);

    if (!rows.length) return res.status(200).json({});

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("❌ Database error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/* ---------------------------------
        UPDATE Logo Design
---------------------------------- */
router.put("/update", upload.single("Image"), async (req, res) => {
  const body = req.body;
  const newImage = req.file ? req.file.filename : null;

  try {
    // Fetch old image (if any)
    let oldImage = null;
    if (newImage) {
      const [rows] = await db.query("SELECT Image FROM logo_design WHERE id=1");
      oldImage = rows[0]?.Image;
    }

    // Build dynamic SET clause
    const fields = [];
    const values = [];

    Object.keys(body).forEach((key) => {
      if (body[key] !== undefined) {
        fields.push(`${key} = ?`);
        values.push(body[key]);
      }
    });

    if (newImage) {
      fields.push("Image = ?");
      values.push(newImage);
    }

    if (!fields.length) {
      return res.status(400).json({ message: "No fields to update" });
    }

    const sql = `UPDATE logo_design SET ${fields.join(", ")} WHERE id=1`;
    await db.query(sql, values);

    // Delete old image file if replaced
    if (oldImage && newImage) {
      const oldPath = path.join(process.cwd(), "uploads", oldImage);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    res
      .status(200)
      .json({ success: true, message: "Logo Design updated successfully" });
  } catch (error) {
    console.error("❌ Update error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
