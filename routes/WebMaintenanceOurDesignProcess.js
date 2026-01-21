import express from "express";
import db from "../db/ConnectDB.js";

const router = express.Router();

router.get("/", (req, res) => {
  const query = `
    SELECT Process1, Process2, Process3, Process4, Process5, Process6
    FROM web_maintenance
    ORDER BY id DESC
    LIMIT 1
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database error" });
    }

    if (!results.length) {
      return res.json([]);
    }

    const { Process1, Process2, Process3, Process4, Process5, Process6 } =
      results[0];

    res.json(
      [Process1, Process2, Process3, Process4, Process5, Process6].filter(
        Boolean
      )
    );
  });
});

export default router;
