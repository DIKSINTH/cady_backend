import express from "express";
import db from "../db/ConnectDB.js";

const router = express.Router();

/* -----------------------------------------
   GET FOOTER (Single Row)
------------------------------------------ */
router.get("/", async (req, res) => {
  try {
    const [result] = await db.query(
      `SELECT Content,
              Item1, Item2, Item3, Item4,
              Item5, Item6, Item7, Item8,
              Link1, Link2, Link3, Link4,
              Link5, Link6, Link7, Link8
       FROM footer
       LIMIT 1`,
    );

    return res.status(200).json(result[0] || {});
  } catch (err) {
    console.error("Footer GET Error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

/* -----------------------------------------
   UPDATE FOOTER
------------------------------------------ */
router.put("/", async (req, res) => {
  try {
    const { Content } = req.body;

    if (!Content || typeof Content !== "string") {
      return res
        .status(400)
        .json({ message: "Content is required and must be a string" });
    }

    const items = Array.from(
      { length: 8 },
      (_, i) => req.body[`Item${i + 1}`] || "",
    );

    const links = Array.from(
      { length: 8 },
      (_, i) => req.body[`Link${i + 1}`] || "",
    );

    const sql = `
      UPDATE footer SET
        Content=?,
        Item1=?, Item2=?, Item3=?, Item4=?,
        Item5=?, Item6=?, Item7=?, Item8=?,
        Link1=?, Link2=?, Link3=?, Link4=?,
        Link5=?, Link6=?, Link7=?, Link8=?
      LIMIT 1
    `;

    await db.query(sql, [Content, ...items, ...links]);

    return res.status(200).json({
      message: "Footer updated successfully",
    });
  } catch (err) {
    console.error("Footer UPDATE Error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
