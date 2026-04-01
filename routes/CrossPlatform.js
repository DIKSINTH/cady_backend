import express from "express";
import db from "../db/ConnectDB.js";
import upload from "../config/multer.js";

const router = express.Router();

/* --------------------------------------
   VIEW — Only Title, Description, Image
--------------------------------------- */
router.get("/", async (req, res) => {
  try {
    const query =
      "SELECT Title, Description, Image FROM crossplatform_development LIMIT 1";

    const [rows] = await db.query(query);

    res.status(200).json(rows[0] || {});
  } catch (err) {
    console.error("❌ DB Error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

/* --------------------------------------
   EDIT — Fetch all fields
--------------------------------------- */
router.get("/edit", async (req, res) => {
  try {
    const query = "SELECT * FROM crossplatform_development LIMIT 1";

    const [rows] = await db.query(query);

    res.status(200).json(rows[0] || {});
  } catch (err) {
    console.error("❌ DB Error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

/* --------------------------------------
   UPDATE — Update all fields
--------------------------------------- */
router.post("/update", upload.single("Image"), async (req, res) => {
  try {
    const body = req.body;
    const finalImage = req.file ? req.file.filename : body.oldImage;

    const fields = [
      "Title",
      "Description",
      "Image",
      "Term1",
      "Term2",
      "Term3",
      "Term4",
      "Description1",
      "Description2",
      "Description3",
      "Description4",
      "Why_Crossplatform1",
      "Why_Crossplatform2",
      "Why_Crossplatform3",
      "Why_Crossplatform4",
      "Why_Crossplatform5",
      "Why_Crossplatform6",
      "Service1",
      "Service2",
      "Service3",
      "Service4",
    ];

    const params = [
      body.Title,
      body.Description,
      finalImage,
      body.Term1,
      body.Term2,
      body.Term3,
      body.Term4,
      body.Description1,
      body.Description2,
      body.Description3,
      body.Description4,
      body.Why_Crossplatform1,
      body.Why_Crossplatform2,
      body.Why_Crossplatform3,
      body.Why_Crossplatform4,
      body.Why_Crossplatform5,
      body.Why_Crossplatform6,
      body.Service1,
      body.Service2,
      body.Service3,
      body.Service4,
    ];

    const query = `
      UPDATE crossplatform_development SET
        ${fields.map((f) => f + "=?").join(", ")}
      WHERE id=1
    `;

    await db.query(query, params);

    res.status(200).json({
      message: "Cross-Platform Development updated successfully",
    });
  } catch (err) {
    console.error("❌ DB Update Error:", err);
    res.status(500).json({
      error: "Failed to update cross-platform data",
    });
  }
});

export default router;
