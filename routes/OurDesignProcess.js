import express from "express";
import db from "../db/ConnectDB.js";

const router = express.Router();

// --- API Route to Fetch Design Processes ---
router.get("/", (req, res) => {
  // Fetch the five specific columns from the first row of the web_design table
  const query =
    "SELECT Process1, Process2, Process3, Process4, Process5 FROM web_design LIMIT 1";
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error fetching data from database");
    }

    if (results.length === 0) {
      return res
        .status(404)
        .send("Design process content not found in database");
    }

    // Transform the object into a simple array for easier rendering in React
    const valuesObject = results[0];
    const processesArray = [
      valuesObject.Process1,
      valuesObject.Process2,
      valuesObject.Process3,
      valuesObject.Process4,
      valuesObject.Process5,
    ].filter(Boolean); // Filter out any null/empty values

    res.json(processesArray);
  });
});

export default router;
