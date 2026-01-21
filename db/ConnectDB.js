import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config(); // Load .env variables

const db = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT,
});

db.connect((err) => {
  if (err) {
    console.error("❌ MySQL connection error:", err);
  } else {
    console.log("✔️ Connected to MySQL Database");
  }
});

export default db;
