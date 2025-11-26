import express from "express";
import db from "../db/ConnectDB.js";

const router = express.Router();

router.post("/", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM admin WHERE Email = ? AND Password = ?";

  db.query(sql, [email, password], (err, result) => {
    if (err) {
      console.log("Query error:", err);
      return res.json({ status: "error", message: "Database error" });
    }

    if (result.length > 0) {
      return res.json({
        status: "success",
        message: "Login successful",
        user: result[0],
      });
    } else {
      return res.json({ status: "fail", message: "Invalid email or password" });
    }
  });
});

export default router;
