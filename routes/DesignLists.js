import express from "express";
import db from "../db/ConnectDB.js";

const router = express.Router();

/* ------------------------------------------
   GET DESIGN VALUES (Web Design)
------------------------------------------ */
router.get("/", async (req, res) => {
  try {
    const query = `
      SELECT Design1, Design2, Design3, Design4, Design5 
      FROM web_design 
      LIMIT 1
    `;

    const [results] = await db.query(query);

    if (!results.length) {
      return res.status(200).json([]); // safer for frontend
    }

    const valuesArray = Object.values(results[0]).filter(Boolean);

    return res.status(200).json(valuesArray);
  } catch (err) {
    console.error("GET /web-design-values Error:", err.message);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
