import express from "express";
import db from "../db/ConnectDB.js";
import upload from "../config/multer.js";

const router = express.Router();

/* -------------------------------------------------
   GET — only Title, Description, Image
------------------------------------------------- */
router.get("/", async (req, res) => {
  try {
    const [results] = await db.query(
      "SELECT Title, Description, Image FROM android_development LIMIT 1",
    );

    if (!results.length) {
      return res.status(404).json({
        success: false,
        message: "No Android content found",
      });
    }

    res.status(200).json({
      success: true,
      data: results[0],
    });
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({
      success: false,
      message: "Database error",
    });
  }
});

/* -------------------------------------------------
   EDIT — fetch all fields (for admin)
------------------------------------------------- */
router.get("/edit", async (req, res) => {
  try {
    const [results] = await db.query(
      "SELECT * FROM android_development LIMIT 1",
    );

    res.status(200).json({
      success: true,
      data: results[0] || {},
    });
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({
      success: false,
      message: "Database error",
    });
  }
});

/* -------------------------------------------------
   UPDATE — update all fields
------------------------------------------------- */
router.post("/update", upload.single("Image"), async (req, res) => {
  try {
    const body = req.body;
    const finalImage = req.file ? req.file.filename : body.oldImage;

    const sql = `
      UPDATE android_development SET
        Title=?, Description=?, Image=?,
        Term1=?, Term2=?, Term3=?, Term4=?, Term5=?, Term6=?,
        Description1=?, Description2=?, Description3=?, Description4=?, Description5=?, Description6=?,
        Why_Android1=?, Why_Android2=?, Why_Android3=?, Why_Android4=?, Why_Android5=?, Why_Android6=?,
        Service1=?, Service2=?, Service3=?, Service4=?, Service5=?, Service6=?
      WHERE id=1
    `;

    const params = [
      body.Title,
      body.Description,
      finalImage,

      body.Term1,
      body.Term2,
      body.Term3,
      body.Term4,
      body.Term5,
      body.Term6,

      body.Description1,
      body.Description2,
      body.Description3,
      body.Description4,
      body.Description5,
      body.Description6,

      body.Why_Android1,
      body.Why_Android2,
      body.Why_Android3,
      body.Why_Android4,
      body.Why_Android5,
      body.Why_Android6,

      body.Service1,
      body.Service2,
      body.Service3,
      body.Service4,
      body.Service5,
      body.Service6,
    ];

    await db.query(sql, params);

    res.status(200).json({
      success: true,
      message: "Android content updated successfully",
    });
  } catch (err) {
    console.error("DB Update Error:", err);
    res.status(500).json({
      success: false,
      message: "Update failed",
      error: err.message,
    });
  }
});

export default router;
