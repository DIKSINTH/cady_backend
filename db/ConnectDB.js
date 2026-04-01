import dotenv from "dotenv";
import mysql from "mysql2";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("❌ MySQL Connection Failed:", err.message);
  } else {
    console.log("✅ MySQL Connected Successfully");
    connection.release();
  }
});

export default pool.promise();
