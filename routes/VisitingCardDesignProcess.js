import express from "express";
import db from "../db/ConnectDB.js";

const router = express.Router();

// GET Visiting Card Design Process
router.get("/", (req, res) => {
  const sqlSelect = `
    SELECT 
      Design_Process1, Design_Process11, Design_Process12, 
      Design_Process2, Design_Process21, Design_Process22, 
      Design_Process3, Design_Process31, 
      Design_Process4, Design_Process41, Design_Process42, 
      Design_Process5, Design_Process51, Design_Process52
    FROM visiting_card
    LIMIT 1
  `;

  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.error("SQL Error:", err);
      return res.status(500).json({
        error: "Database query failed",
      });
    }

    res.json(result);
  });
});

export default router;
