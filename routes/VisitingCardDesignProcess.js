import express from "express";
import pool from "../db/ConnectDB.js"; // Promise-based pool

const router = express.Router();

// --- API Route to Fetch Visiting Card Design Process ---
router.get("/", async (req, res) => {
  try {
    const sql = `
      SELECT 
        Design_Process1, Design_Process11, Design_Process12, 
        Design_Process2, Design_Process21, Design_Process22, 
        Design_Process3, Design_Process31, 
        Design_Process4, Design_Process41, Design_Process42, 
        Design_Process5, Design_Process51, Design_Process52
      FROM visiting_card
      LIMIT 1
    `;

    const [results] = await pool.query(sql);

    if (results.length === 0) {
      return res.status(404).json({ message: "No design process found" });
    }

    // Optional: Flatten the object into an array or structured object
    const data = results[0];
    const processes = [
      {
        main: data.Design_Process1,
        sub1: data.Design_Process11,
        sub2: data.Design_Process12,
      },
      {
        main: data.Design_Process2,
        sub1: data.Design_Process21,
        sub2: data.Design_Process22,
      },
      { main: data.Design_Process3, sub1: data.Design_Process31 },
      {
        main: data.Design_Process4,
        sub1: data.Design_Process41,
        sub2: data.Design_Process42,
      },
      {
        main: data.Design_Process5,
        sub1: data.Design_Process51,
        sub2: data.Design_Process52,
      },
    ];

    res.json(processes);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Database error" });
  }
});

export default router;
