import express from "express";
import db from "../db/ConnectDB.js";

const router = express.Router();

/* -----------------------------------------
   GET FOOTER (ONLY ONE ROW)
------------------------------------------ */
router.get("/", (req, res) => {
  db.query("SELECT * FROM footer LIMIT 1", (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result[0] || {});
  });
});

/* -----------------------------------------
   UPDATE FOOTER
------------------------------------------ */
router.put("/", (req, res) => {
  const {
    Content,
    Item1,
    Item2,
    Item3,
    Item4,
    Item5,
    Item6,
    Item7,
    Item8,
    Item9,
    Item10,
    Item11,
    Item12,
    Item13,
    Item14,
    Item15,
    Item16,
  } = req.body;

  const sql = `
    UPDATE footer SET
      Content=?, Item1=?, Item2=?, Item3=?, Item4=?, Item5=?, Item6=?,
      Item7=?, Item8=?, Item9=?, Item10=?, Item11=?, Item12=?, 
      Item13=?, Item14=?, Item15=?, Item16=?
    LIMIT 1
  `;

  db.query(
    sql,
    [
      Content,
      Item1,
      Item2,
      Item3,
      Item4,
      Item5,
      Item6,
      Item7,
      Item8,
      Item9,
      Item10,
      Item11,
      Item12,
      Item13,
      Item14,
      Item15,
      Item16,
    ],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Footer updated successfully" });
    }
  );
});

export default router;
