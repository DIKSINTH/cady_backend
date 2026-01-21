import express from "express";
import db from "../db/ConnectDB.js";

const router = express.Router();

router.get("/", (req, res) => {
  const sql =
    "SELECT Process1, Process2, Process3, Process4 FROM logo_design LIMIT 1";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (!result || result.length === 0) {
      return res.status(404).json({ message: "No data found" });
    }

    const row = result[0];

    const processArray = [
      { name: row.Process1 || "", step: "STEP 1", dir: "up" },
      { name: row.Process2 || "", step: "STEP 2", dir: "down" },
      { name: row.Process3 || "", step: "STEP 3", dir: "up" },
      { name: row.Process4 || "", step: "STEP 4", dir: "down" },
    ];

    res.json(processArray);
  });
});

export default router;
