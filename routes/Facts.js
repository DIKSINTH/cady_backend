import express from "express";
import fs from "fs";
import path from "path";
import db from "../db/ConnectDB.js";
import upload from "../config/multer.js";

const router = express.Router();

/* ------------------------------------------
   GET ALL FACTS
------------------------------------------ */
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM facts ORDER BY id ASC");
    res.status(200).json(rows);
  } catch (err) {
    console.error("GET /facts Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

/* ------------------------------------------
   GET FACT BY ID
------------------------------------------ */
router.get("/:id", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM facts WHERE id = ?", [
      req.params.id,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Fact not found" });
    }

    res.status(200).json(rows[0]);
  } catch (err) {
    console.error(`GET /facts/${req.params.id} Error:`, err);
    res.status(500).json({ message: "Internal server error" });
  }
});

/* ------------------------------------------
   UPDATE FACT (Name, Count, Image)
------------------------------------------ */
router.put("/update/:id", upload.single("Image"), async (req, res) => {
  try {
    const { Name, Count } = req.body;
    const factId = req.params.id;

    const [rows] = await db.query("SELECT Image FROM facts WHERE id = ?", [
      factId,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Fact not found" });
    }

    let oldImage = rows[0].Image;
    let newImage = oldImage;

    if (req.file) {
      newImage = req.file.filename;

      // Delete old image if exists
      const oldPath = path.join(process.cwd(), "uploads", oldImage);
      if (oldImage && fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }

    await db.query("UPDATE facts SET Name=?, Count=?, Image=? WHERE id=?", [
      Name,
      Count,
      newImage,
      factId,
    ]);

    res.status(200).json({ message: "Fact updated successfully" });
  } catch (err) {
    console.error(`PUT /facts/update/${req.params.id} Error:`, err);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
