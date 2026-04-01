import express from "express";
import db from "../db/ConnectDB.js"; // This is your mysql2 pool.promise()

const router = express.Router();

/* ---------------------------------
   GET About Us Content
---------------------------------- */
router.get("/", async (req, res) => {
  const query = "SELECT Scroll_Content, About FROM about_us LIMIT 1";

  try {
    const [results] = await db.query(query);

    if (!results.length) {
      return res.status(404).json({ message: "About Us content not found" });
    }

    res.status(200).json(results[0]);
  } catch (error) {
    console.error("DB Error:", error);
    res.status(500).json({ message: "Error fetching data from database" });
  }
});

export default router;
