import express from "express";
import db from "../db/ConnectDB.js";

const router = express.Router();

// --- API Route to Fetch iOS Terms ---
router.get("/", (req, res) => {
  // Fetch all 12 columns from the first row of the ios_development table
  const query =
    "SELECT Term1, Description1, Term2, Description2, Term3, Description3, Term4, Description4, Term5, Description5, Term6, Description6 FROM ios_development LIMIT 1";
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error fetching data from database");
    }

    if (results.length === 0) {
      return res
        .status(404)
        .send("Android process content not found in database");
    }

    // Transform the single object into a structured array of 6 objects
    const data = results[0];
    const processSteps = [];

    for (let i = 1; i <= 6; i++) {
      const termKey = `Term${i}`;
      const descKey = `Description${i}`;

      if (data[termKey] && data[descKey]) {
        processSteps.push({
          term: data[termKey],
          description: data[descKey],
        });
      }
    }

    res.json(processSteps);
  });
});

export default router;
