import express from "express";
import db from "../db/ConnectDB.js";

const router = express.Router();

router.get("/counts", async (req, res) => {
  try {
    const queries = {
      blogs: "SELECT COUNT(id) AS total FROM blog",
      banners: "SELECT COUNT(id) AS total FROM banners",
      testimonials: "SELECT COUNT(id) AS total FROM testimonials",
      services: "SELECT COUNT(id) AS total FROM services",
    };

    const runQuery = (sql) =>
      new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
          if (err) reject(err);
          else resolve(result[0].total);
        });
      });

    const data = {
      blogs: await runQuery(queries.blogs),
      banners: await runQuery(queries.banners),
      testimonials: await runQuery(queries.testimonials),
      services: await runQuery(queries.services),
    };

    res.json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default router;
