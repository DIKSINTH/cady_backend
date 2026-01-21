// aboutUsRoute.js
import express from "express";
import db from "../db/ConnectDB.js";

const router = express.Router();

router.get("/", (req, res) => {
  const query = "SELECT Scroll_Content, About FROM about_us LIMIT 1";
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error fetching data from database");
    }

    if (results.length === 0) {
      return res.status(404).send("Content not found in database");
    }

    res.json(results[0]);
  });
});

export default router;
