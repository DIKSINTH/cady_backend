import express from "express";
import db from "../db/ConnectDB.js";

const router = express.Router();

// --- API Route to Fetch Android Service Points ---
router.get("/", (req, res) => {
  // Fetch the six specific columns from the first row of the android_development table
  const query =
    "SELECT Service1, Service2, Service3, Service4, Service5, Service6 FROM android_development LIMIT 1";
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error fetching data from database");
    }

    if (results.length === 0) {
      return res
        .status(404)
        .send("Android services content not found in     database");
    }

    // Transform the object into a simple array for easier rendering in React
    const data = results[0];
    const servicesArray = [
      data.Service1,
      data.Service2,
      data.Service3,
      data.Service4,
      data.Service5,
      data.Service6,
    ].filter(Boolean); // Filter out any null/empty values

    res.json(servicesArray);
  });
});
export default router;
