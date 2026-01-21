import express from "express";
import db from "../db/ConnectDB.js";

const router = express.Router();

// --- API Route to Fetch Design Values ---
router.get("/", (req, res) => {
  // Fetch the five specific columns from the first row of the web_development table
  const query =
    "SELECT Design1, Design2, Design3, Design4, Design5 FROM web_development LIMIT 1";
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error fetching data from database");
    }

    if (results.length === 0) {
      return res.status(404).send("Design values not found in database");
    }

    // Transform the object into a simple array for easier rendering in React
    const valuesObject = results[0];
    const valuesArray = [
      valuesObject.Design1,
      valuesObject.Design2,
      valuesObject.Design3,
      valuesObject.Design4,
      valuesObject.Design5,
    ].filter(Boolean); // Filter out any null/empty values

    res.json(valuesArray);
  });
});

export default router;
