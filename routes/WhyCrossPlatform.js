import express from "express";
import pool from "../db/ConnectDB.js"; // Promise-based pool

const router = express.Router();

// --- API Route to Fetch Why Cross Platform Points ---
router.get("/", async (req, res) => {
  try {
    const query = `
      SELECT 
        Why_Crossplatform1, 
        Why_Crossplatform2, 
        Why_Crossplatform3, 
        Why_Crossplatform4, 
        Why_Crossplatform5, 
        Why_Crossplatform6 
      FROM crossplatform_development 
      LIMIT 1
    `;

    const [results] = await pool.query(query);

    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: '"Why Cross Platform" content not found' });
    }

    const data = results[0];

    const pointsArray = [
      data.Why_Crossplatform1,
      data.Why_Crossplatform2,
      data.Why_Crossplatform3,
      data.Why_Crossplatform4,
      data.Why_Crossplatform5,
      data.Why_Crossplatform6,
    ].filter(Boolean); // Remove null/empty values

    res.json(pointsArray);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Database error" });
  }
});

export default router;
