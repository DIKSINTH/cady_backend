import express from "express";
import db from "../db/ConnectDB.js";

const router = express.Router();

// --- API Route to Fetch Why Android Points ---
router.get("/", (req, res) => {
  // Fetch the six specific columns from the first row of the android_development table
  const query =
    "SELECT Why_Android1, Why_Android2, Why_Android3, Why_Android4, Why_Android5, Why_Android6 FROM android_development LIMIT 1";
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error fetching data from database");
    }

    if (results.length === 0) {
      return res
        .status(404)
        .send('"Why Android" content not found in database');
    }

    // Transform the object into a simple array for easier rendering in React
    const data = results[0];
    const pointsArray = [
      data.Why_Android1,
      data.Why_Android2,
      data.Why_Android3,
      data.Why_Android4,
      data.Why_Android5,
      data.Why_Android6,
    ].filter(Boolean); // Filter out any null/empty values

    res.json(pointsArray);
  });
});

export default router;
