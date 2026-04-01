import express from "express";
import pool from "../db/ConnectDB.js"; // Promise-based pool
import upload from "../config/multer.js";

const router = express.Router();

/* -----------------------------------------
   FETCH ALL WHY CHOOSE US
----------------------------------------- */
router.get("/", async (req, res) => {
  try {
    const [results] = await pool.query(
      "SELECT * FROM why_choose_us ORDER BY id DESC",
    );
    res.json(results);
  } catch (error) {
    console.error("Fetch All Error:", error);
    res.status(500).json({ message: "Database error" });
  }
});

/* -----------------------------------------
   FETCH SINGLE ITEM
----------------------------------------- */
router.get("/:id", async (req, res) => {
  try {
    const [results] = await pool.query(
      "SELECT * FROM why_choose_us WHERE id = ?",
      [req.params.id],
    );

    if (results.length === 0) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json(results[0]);
  } catch (error) {
    console.error("Fetch Single Error:", error);
    res.status(500).json({ message: "Database error" });
  }
});

/* -----------------------------------------
   ADD NEW ITEM
----------------------------------------- */
router.post("/", upload.single("Image"), async (req, res) => {
  try {
    const { Name, Description } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image upload failed" });
    }

    const Image = req.file.filename;

    const [result] = await pool.query(
      "INSERT INTO why_choose_us (Name, Description, Image) VALUES (?, ?, ?)",
      [Name, Description, Image],
    );

    res.json({
      message: "Item added successfully",
      id: result.insertId,
    });
  } catch (error) {
    console.error("Insert Error:", error);
    res.status(500).json({ message: "Database error" });
  }
});

/* -----------------------------------------
   UPDATE ITEM
----------------------------------------- */
router.put("/:id", upload.single("Image"), async (req, res) => {
  try {
    const { Name, Description } = req.body;

    let sql, params;

    if (req.file) {
      sql =
        "UPDATE why_choose_us SET Name = ?, Description = ?, Image = ? WHERE id = ?";
      params = [Name, Description, req.file.filename, req.params.id];
    } else {
      sql = "UPDATE why_choose_us SET Name = ?, Description = ? WHERE id = ?";
      params = [Name, Description, req.params.id];
    }

    await pool.query(sql, params);

    res.json({ message: "Item updated successfully" });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ message: "Database error" });
  }
});

/* -----------------------------------------
   DELETE ITEM
----------------------------------------- */
router.delete("/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM why_choose_us WHERE id = ?", [req.params.id]);

    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ message: "Database error" });
  }
});

export default router;
