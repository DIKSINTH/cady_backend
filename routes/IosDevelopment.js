import express from "express";
import db from "../db/ConnectDB.js";
import upload from "../config/multer.js";

const router = express.Router();

/* ------------------------------
   VIEW — only Title, Description, Image
------------------------------- */
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT Title, Description, Image FROM ios_development LIMIT 1",
    );

    if (!rows.length) {
      return res.status(200).json({}); // empty object if no record
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("❌ DB Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/* ------------------------------
   EDIT — fetch all fields
------------------------------- */
router.get("/edit", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM ios_development LIMIT 1");

    if (!rows.length) return res.status(200).json({});

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("❌ DB Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/* ------------------------------
   UPDATE — update all fields
------------------------------- */
router.post("/update", upload.single("Image"), async (req, res) => {
  const body = req.body;
  const finalImage = req.file ? req.file.filename : body.oldImage;

  const query = `
    UPDATE ios_development SET
      Title=?, Description=?, Image=?,

      Term1=?, Term2=?, Term3=?, Term4=?, Term5=?, Term6=?,
      Description1=?, Description2=?, Description3=?, Description4=?, Description5=?, Description6=?,
      Why_Ios1=?, Why_Ios2=?, Why_Ios3=?, Why_Ios4=?,
      Service1=?, Service2=?, Service3=?, Service4=?
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

    body.Why_Ios1,
    body.Why_Ios2,
    body.Why_Ios3,
    body.Why_Ios4,

    body.Service1,
    body.Service2,
    body.Service3,
    body.Service4,
  ];

  try {
    await db.query(query, params);
    res.status(200).json({ message: "Updated successfully" });
  } catch (error) {
    console.error("❌ DB Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
