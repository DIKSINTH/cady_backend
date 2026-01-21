import express from "express";
import db from "../db/ConnectDB.js";
const router = express.Router(); //T all services – return name, description, image_url
router.get("/", (req, res) => {
  const q =
    "SELECT id, Name AS name, Count AS count, Image AS image_url FROM facts";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json({ error: err });
    res.json(data);
  });
});
export default router;
