import express from "express";
import db from "../db/ConnectDB.js";

const router = express.Router();

// --- API Route to Fetch Cross Platform Process Steps ---
router.get("/", (req, res) => {
  const query = `
    SELECT 
      Term1, Description1,
      Term2, Description2,
      Term3, Description3,
      Term4, Description4
    FROM crossplatform_development
    LIMIT 1
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error fetching data from database");
    }

    if (results.length === 0) {
      return res.status(404).send("Cross platform data not found");
    }

    const data = results[0];
    const processSteps = [];

    // 🔹 Only loop till 4 now
    for (let i = 1; i <= 4; i++) {
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
