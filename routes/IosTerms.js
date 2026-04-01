import express from "express";
import db from "../db/ConnectDB.js";

const router = express.Router();

/* -------------------------------------------------
   GET iOS Development Terms
------------------------------------------------- */
router.get("/", async (req, res) => {
  const query = `
    SELECT 
      Term1, Description1,
      Term2, Description2,
      Term3, Description3,
      Term4, Description4,
      Term5, Description5,
      Term6, Description6
    FROM ios_development
    LIMIT 1
  `;

  try {
    const [rows] = await db.query(query);

    if (!rows.length) {
      return res.status(200).json([]); // Return empty array if no data
    }

    const data = rows[0];
    const processSteps = [];

    for (let i = 1; i <= 6; i++) {
      const term = data[`Term${i}`];
      const description = data[`Description${i}`];

      if (term || description) {
        processSteps.push({
          term: term || "",
          description: description || "",
        });
      }
    }

    res.status(200).json(processSteps);
  } catch (error) {
    console.error("❌ Database error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
