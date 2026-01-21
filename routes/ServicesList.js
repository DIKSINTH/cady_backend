import express from "express";
import db from "../db/ConnectDB.js";

const router = express.Router();

// GET all services – return name, description, image_url
router.get("/", (req, res) => {
  const q =
    "SELECT id, Name AS name, Description AS description, Image AS image_url FROM services";

  db.query(q, (err, data) => {
    if (err) return res.status(500).json({ error: err });
    res.json(data); // return full array
  });
});

export default router;
