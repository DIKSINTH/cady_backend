import express from "express";
import db from "../db/ConnectDB.js";
import upload from "../config/multer.js";
import fs from "fs";
import path from "path";

const router = express.Router();

// ------------------ READ ------------------
router.get("/", async (req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM about_us LIMIT 1");
    res.status(200).json(results[0] || {});
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: "Error fetching About Us content" });
  }
});

// ------------------ UPDATE ------------------
router.put("/", upload.single("Image"), async (req, res) => {
  try {
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

    // Handle image update
    let newImagePath;
    if (req.file) {
      newImagePath = "/uploads/" + req.file.filename;

      // Delete old image safely
      const [oldRow] = await db.query("SELECT Image FROM about_us LIMIT 1");
      const oldImage = oldRow[0]?.Image;
      if (oldImage) {
        const oldPath = path.join(path.resolve(), oldImage.replace(/^\//, ""));
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
    }

    // Build query dynamically
    let sql = `
      UPDATE about_us SET 
        Description=?, Scroll_Content=?, About=?, Vision=?, Mission=?,
        Value1=?, Value2=?, Value3=?, Value4=?
    `;
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

    if (newImagePath) {
      sql += `, Image=?`;
      params.push(newImagePath);
    }

    await db.query(sql, params);
    res.json({ message: "About Us updated successfully" });
  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({ error: "Error updating About Us content" });
  }
});

export default router;
