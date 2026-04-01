import express from "express";
import db from "../db/ConnectDB.js";

const router = express.Router();

/* --------------------------------------
   GET CROSS-PLATFORM DEVELOPMENT STEPS
--------------------------------------- */
router.get("/", async (req, res) => {
  const query = `
    SELECT 
      \`Term1\`, \`Description1\`,
      \`Term2\`, \`Description2\`,
      \`Term3\`, \`Description3\`,
      \`Term4\`, \`Description4\`
    FROM \`crossplatform_development\`
    LIMIT 1
  `;

  try {
    // In mysql2/promise, .query() returns [rows, fields]
    // We use destructuring to get just the rows (results)
    const [results] = await db.query(query);

    // Check if results exist and have at least one row
    if (!results || results.length === 0) {
      return res.status(404).json({
        message: "Cross-platform data not found",
      });
    }

    const row = results[0];
    const steps = [];

    // Loop through the columns to format the response
    for (let i = 1; i <= 4; i++) {
      const term = row[`Term${i}`];
      const description = row[`Description${i}`];

      if (term && description) {
        steps.push({ term, description });
      }
    }

    // Success response
    res.status(200).json(steps);
  } catch (err) {
    // This replaces the (err) callback parameter
    console.error("DB Error:", err);

    return res.status(500).json({
      message: "Database error",
      error: err.message,
    });
  }
});

export default router;
