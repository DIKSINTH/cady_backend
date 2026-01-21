import express from "express";
import db from "../db/ConnectDB.js";

const router = express.Router();

router.get("/", (req, res) => {
  const sql = "SELECT Name, Position, Description, Image FROM testimonials";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const mappedData = result.map((item) => ({
      Name: item.Name,
      Position: item.Position,
      Description: item.Description,
      Image: item.Image ? `http://localhost:5000/uploads/${item.Image}` : "",
    }));

    res.json(mappedData);
  });
});

export default router;
