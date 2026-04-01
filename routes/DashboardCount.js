import express from "express";
import db from "../db/ConnectDB.js";

const router = express.Router();

/* --------------------------------------
   GET COUNTS FOR DASHBOARD
--------------------------------------- */
router.get("/counts", async (req, res) => {
  try {
    const queries = {
      blogs: "SELECT COUNT(id) AS total FROM blog",
      banners: "SELECT COUNT(id) AS total FROM banners",
      testimonials: "SELECT COUNT(id) AS total FROM testimonials",
      services: "SELECT COUNT(id) AS total FROM services",
    };

    // Run all queries in parallel using promise style
    const results = await Promise.all(
      Object.values(queries).map(async (sql) => {
        const [rows] = await db.query(sql);
        return rows[0]?.total || 0;
      }),
    );

    const data = Object.keys(queries).reduce((acc, key, index) => {
      acc[key] = results[index];
      return acc;
    }, {});

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching counts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
