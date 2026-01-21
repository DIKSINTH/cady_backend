import express from "express";
import db from "../db/ConnectDB.js";

const router = express.Router();

// --- API Route to Fetch Welcome Blog Content ---
router.get("/", (req, res) => {
  const query =
    "SELECT Heading, Content, Image FROM testimonial_content LIMIT 1";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({
        message: "Error fetching data from database",
      });
    }

    if (!results.length) {
      return res.status(404).json({
        message: "Welcome blog content not found",
      });
    }

    res.json(results[0]);
  });
});

export default router;
