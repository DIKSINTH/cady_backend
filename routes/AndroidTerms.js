import express from "express";
import db from "../db/ConnectDB.js";

const router = express.Router();

// --- API Route to Fetch Android Process Steps ---
router.get("/", async (req, res) => {
  try {
    const query = `
      SELECT 
        Term1, Description1,
        Term2, Description2,
        Term3, Description3,
        Term4, Description4,
        Term5, Description5,
        Term6, Description6
      FROM android_development
      LIMIT 1
    `;

    const [results] = await db.query(query);

    if (!results.length) {
      return res.status(404).json({
        success: false,
        message: "No Android process data found",
      });
    }

    const data = results[0];
    const processSteps = [];

    for (let i = 1; i <= 6; i++) {
      const termKey = `Term${i}`;
      const descKey = `Description${i}`;

      if (
        data[termKey] &&
        data[descKey] &&
        data[termKey].trim() !== "" &&
        data[descKey].trim() !== ""
      ) {
        processSteps.push({
          term: data[termKey],
          description: data[descKey],
        });
      }
    }

    res.status(200).json({
      success: true,
      steps: processSteps,
    });
  } catch (err) {
    console.error("Android Process DB Error:", err);
    res.status(500).json({
      success: false,
      message: "Database error",
    });
  }
});

export default router;
