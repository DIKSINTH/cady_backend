import express from "express";
import db from "../db/ConnectDB.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const [footerResults] = await db.query(`
      SELECT 
        Content AS Content,
        Item1 AS Item1,
        Item2 AS Item2,
        Item3 AS Item3,
        Item4 AS Item4,
        Item5 AS Item5,
        Item6 AS Item6,
        Item7 AS Item7,
        Item8 AS Item8,
        Link1 AS Link1,
        Link2 AS Link2,
        Link3 AS Link3,
        Link4 AS Link4,
        Link5 AS Link5,
        Link6 AS Link6,
        Link7 AS Link7,
        Link8 AS Link8
      FROM footer
      LIMIT 1
    `);

    const [settingsResults] = await db.query(`
      SELECT 
        Address AS Address,
        Mobile_Number AS Mobile_Number,
        Email AS Email
      FROM settings
      LIMIT 1
    `);

    const footer = footerResults[0] || {};
    const settings = settingsResults[0] || {};

    res.json({
      Content: footer.Content || "",

      Item1: footer.Item1 || "",
      Item2: footer.Item2 || "",
      Item3: footer.Item3 || "",
      Item4: footer.Item4 || "",
      Item5: footer.Item5 || "",
      Item6: footer.Item6 || "",
      Item7: footer.Item7 || "",
      Item8: footer.Item8 || "",

      Link1: footer.Link1 || "",
      Link2: footer.Link2 || "",
      Link3: footer.Link3 || "",
      Link4: footer.Link4 || "",
      Link5: footer.Link5 || "",
      Link6: footer.Link6 || "",
      Link7: footer.Link7 || "",
      Link8: footer.Link8 || "",

      settings: settings,
    });
  } catch (error) {
    console.error("Footer Fetch Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
