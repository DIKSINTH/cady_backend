import express from "express";
import db from "../db/ConnectDB.js";

const router = express.Router();

// --- API Route to Fetch iOS Development Content ---
router.get("/", (req, res) => {
  // Fetch the single row containing all content
  const query = "SELECT Title, Description, Image FROM ios_development LIMIT 1";
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error fetching data from database");
    }

    if (results.length === 0) {
      return res
        .status(404)
        .send("Android Development content not found in database");
    }

    // Return the first (and only) row
    res.json(results[0]);
  });
});

export default router;
