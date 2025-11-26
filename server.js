import express from "express";
import cors from "cors";
import AdminCheck from "./routes/AdminCheck.js";
import mysql from "mysql2"; // <-- new import

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/login", AdminCheck);

// ----------------- New Code -----------------
// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "cady_infotech",
});

// API endpoint for About Us
app.get("/api/aboutus", (req, res) => {
  db.query("SELECT * FROM about_us LIMIT 1", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0]); // Send single object
  });
});
// ----------------- End New Code -----------------

app.listen(5000, () => console.log("Server running on port 5000"));
