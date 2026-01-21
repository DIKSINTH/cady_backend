import express from "express";
import db from "../db/ConnectDB.js";

const router = express.Router();

// --- API Route to Fetch Why Cross Platform Points ---
router.get("/", (req, res) => {
  // Fetch the six specific columns from the first row of the crossplatform_development table
  const query =
    "SELECT Why_Crossplatform1, Why_Crossplatform2, Why_Crossplatform3, Why_Crossplatform4, Why_Crossplatform5, Why_Crossplatform6 FROM crossplatform_development LIMIT 1";
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error fetching data from database");
    }

    if (results.length === 0) {
      return res
        .status(404)
        .send('"Why Cross Platform" content not found in database');
    }

    // Transform the object into a simple array for easier rendering in React
    const data = results[0];
    const pointsArray = [
      data.Why_Crossplatform1,
      data.Why_Crossplatform2,
      data.Why_Crossplatform3,
      data.Why_Crossplatform4,
      data.Why_Crossplatform5,
      data.Why_Crossplatform6,
    ].filter(Boolean); // Filter out any null/empty values

    res.json(pointsArray);
  });
});

export default router;
