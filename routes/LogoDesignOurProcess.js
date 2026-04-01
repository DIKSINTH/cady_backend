import express from "express";
import db from "../db/ConnectDB.js";

const router = express.Router();

/**
 * GET /api/logo-design-process
 * Returns structured logo design process steps
 */
router.get("/", async (req, res) => {
  try {
    const sql = `
      SELECT Process1, Process2, Process3, Process4
      FROM logo_design
      LIMIT 1
    `;

    const [rows] = await db.query(sql);

    if (!rows.length) {
      return res.status(200).json([]);
    }

    const directions = ["up", "down", "up", "down"];

    const processArray = Object.values(rows[0])
      .map((value, index) => ({
        name: value,
        step: `STEP ${index + 1}`,
        dir: directions[index],
      }))
      .filter((item) => item.name);

    return res.status(200).json(processArray);
  } catch (error) {
    console.error("GET /logo-design-process Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

export default router;
