import express from "express";
import db from "../db/ConnectDB.js";
import upload from "../config/multer.js";
import path from "path";
import fs from "fs";

const router = express.Router();

/* ---------------------------------------------------------
   FETCH ALL TESTIMONIALS (FIXED KEYS)
--------------------------------------------------------- */
router.get("/", (req, res) => {
  db.query("SELECT * FROM testimonials ORDER BY id DESC", (err, results) => {
    if (err) return res.status(500).json({ error: err });

    const mapped = results.map((row) => ({
      id: row.id,
      name: row.Name,
      position: row.Position,
      description: row.Description,
      image: row.Image,
    }));

    res.json(mapped);
  });
});

/* ---------------------------------------------------------
   FETCH SINGLE TESTIMONIAL
--------------------------------------------------------- */
router.get("/:id", (req, res) => {
  db.query(
    "SELECT * FROM testimonials WHERE id = ?",
    [req.params.id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err });

      if (!results.length)
        return res.status(404).json({ error: "Testimonial not found" });

      const row = results[0];

      res.json({
        id: row.id,
        name: row.Name,
        position: row.Position,
        description: row.Description,
        image: row.Image,
      });
    }
  );
});

/* ---------------------------------------------------------
   ADD TESTIMONIAL (FIXED)
--------------------------------------------------------- */
router.post("/", upload.single("image"), (req, res) => {
  const { name, position, description } = req.body;

  if (!req.file) {
    return res.status(400).json({ error: "Image upload failed" });
  }

  db.query(
    "INSERT INTO testimonials (Name, Position, Description, Image) VALUES (?, ?, ?, ?)",
    [name, position, description, req.file.filename],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });

      res.json({
        message: "Testimonial added successfully",
        id: result.insertId,
      });
    }
  );
});

/* ---------------------------------------------------------
   UPDATE TESTIMONIAL (FIXED)
--------------------------------------------------------- */
router.put("/:id", upload.single("image"), (req, res) => {
  const { name, position, description } = req.body;

  db.query(
    "SELECT Image FROM testimonials WHERE id = ?",
    [req.params.id],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err });

      const oldImage = rows[0]?.Image;

      let sql, params;

      if (req.file) {
        sql =
          "UPDATE testimonials SET Name=?, Position=?, Description=?, Image=? WHERE id=?";
        params = [
          name,
          position,
          description,
          req.file.filename,
          req.params.id,
        ];

        if (oldImage) {
          fs.unlink(path.join(process.cwd(), "uploads", oldImage), () => {});
        }
      } else {
        sql =
          "UPDATE testimonials SET Name=?, Position=?, Description=? WHERE id=?";
        params = [name, position, description, req.params.id];
      }

      db.query(sql, params, (err) => {
        if (err) return res.status(500).json({ error: err });

        res.json({ message: "Testimonial updated successfully" });
      });
    }
  );
});

/* ---------------------------------------------------------
   DELETE TESTIMONIAL
--------------------------------------------------------- */
router.delete("/:id", (req, res) => {
  db.query(
    "SELECT Image FROM testimonials WHERE id = ?",
    [req.params.id],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err });

      const image = rows[0]?.Image;

      db.query(
        "DELETE FROM testimonials WHERE id = ?",
        [req.params.id],
        (err) => {
          if (err) return res.status(500).json({ error: err });

          if (image) {
            fs.unlink(path.join(process.cwd(), "uploads", image), () => {});
          }

          res.json({ message: "Testimonial deleted successfully" });
        }
      );
    }
  );
});

export default router;
