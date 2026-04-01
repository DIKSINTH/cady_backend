import express from "express";
import db from "../db/ConnectDB.js";
import upload from "../config/multer.js";

const router = express.Router();

/* -----------------------------------
   GET Contact Us (single row)
------------------------------------ */
router.get("/", async (req, res) => {
  try {
    const [result] = await db.query("SELECT * FROM contact_us LIMIT 1");

    if (!result.length) {
      return res.status(200).json({
        id: null,
        Title: "",
        Sub_Title: "",
        Image: "",
      });
    }

    res.status(200).json(result[0]);
  } catch (err) {
    console.error("❌ DB Error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

/* -----------------------------------
   UPDATE Contact Us
------------------------------------ */
router.put("/update/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const { Title, Sub_Title, oldImage } = req.body;

    const newImage = req.file ? req.file.filename : oldImage || null;

    const sql =
      "UPDATE contact_us SET Title=?, Sub_Title=?, Image=? WHERE id=?";
    const values = [Title, Sub_Title, newImage, id];

    await db.query(sql, values);

    res.status(200).json({
      success: true,
      message: "Contact Us updated successfully",
    });
  } catch (err) {
    console.error("❌ DB Update Error:", err);
    res.status(500).json({ error: "Failed to update Contact Us" });
  }
});

export default router;
