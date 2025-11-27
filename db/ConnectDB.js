import mysql from "mysql2";


const db = mysql.createConnection({
host: "localhost",
user: "root",
password: "",
database: "cady_infotech",
});


db.connect((err) => {
if (err) {
console.log("❌ MySQL connection error:", err);
} else {
console.log("✔️ Connected to MySQL Database");
}
});


export default db;