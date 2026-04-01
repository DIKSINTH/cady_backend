import express from "express";
import pool from "../db/ConnectDB.js"; // Promise-based pool
import upload from "../config/multer.js";

const router = express.Router();

/* -----------------------------------------
   VIEW — only Title, Description, Image
----------------------------------------- */
router.get("/", async (req, res) => {
  try {
    const [results] = await pool.query(
      "SELECT Title, Description, Image FROM web_maintenance LIMIT 1",
    );

    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "Web Maintenance content not found" });
    }

    res.json(results[0]);
  } catch (error) {
    console.error("DB Error:", error);
    res.status(500).json({ message: "Database error" });
  }
});

/* -----------------------------------------
   EDIT — fetch all fields
----------------------------------------- */
router.get("/edit", async (req, res) => {
  try {
    const [results] = await pool.query("SELECT * FROM web_maintenance LIMIT 1");

    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "Web Maintenance content not found" });
    }

    res.json(results[0]);
  } catch (error) {
    console.error("DB Error:", error);
    res.status(500).json({ message: "Database error" });
  }
});

/* -----------------------------------------
   UPDATE — use POST for FormData
----------------------------------------- */
router.post("/update", upload.single("Image"), async (req, res) => {
  try {
    const body = req.body;

    // Use new image if uploaded, else keep old
    const finalImage = req.file ? req.file.filename : body.oldImage;

    const query = `
      UPDATE web_maintenance SET 
        Title=?, Description=?, Image=?,
        Design1=?, Design2=?, Design3=?, Design4=?, Design5=?,
        Process1=?, Process2=?, Process3=?, Process4=?, Process5=?, Process6=?,
        Content1=?, Content2=?
      WHERE id=1
    `;

    const params = [
      body.Title,
      body.Description,
      finalImage,
      body.Design1,
      body.Design2,
      body.Design3,
      body.Design4,
      body.Design5,
      body.Process1,
      body.Process2,
      body.Process3,
      body.Process4,
      body.Process5,
      body.Process6,
      body.Content1,
      body.Content2,
    ];

    await pool.query(query, params);

    res.json({ message: "Updated successfully" });
  } catch (error) {
    console.error("DB Error:", error);
    res.status(500).json({ message: "Database error" });
  }
});

export default router;
