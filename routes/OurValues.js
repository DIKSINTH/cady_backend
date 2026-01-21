import express from "express";
import db from "../db/ConnectDB.js";

const router = express.Router();

// --- API Route to Fetch Values ---
router.get("/", (req, res) => {
  // Fetch the four specific columns from the first row
  const query = "SELECT Value1, Value2, Value3, Value4 FROM about_us LIMIT 1";
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error fetching data from database");
    }

    if (results.length === 0) {
      return res.status(404).send("Values content not found in database");
    }

    // The result is an object like { Value1: 'Trust', ... }
    // We will transform it into an array for easier rendering in React
    const valuesObject = results[0];
    const valuesArray = [
      valuesObject.Value1,
      valuesObject.Value2,
      valuesObject.Value3,
      valuesObject.Value4,
    ].filter(Boolean); // Filter out any null/empty values

    res.json(valuesArray);
  });
});

export default router;
