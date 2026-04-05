import dotenv from "dotenv";
dotenv.config();

import mysql from "mysql2/promise";

// ✅ Create pool
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

console.log("MySQL pool created");

// ✅ Test connection immediately
(async () => {
  try {
    const connection = await db.getConnection();
    console.log("✅ MySQL Connected");
    connection.release();
  } catch (err) {
    console.error("❌ DB Connection Failed:", err.message);
  }
})();

export default db;
