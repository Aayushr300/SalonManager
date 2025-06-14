// const { CONFIG } = require("./index");

// const mySqlPromise = require("mysql2/promise");

// const pool = mySqlPromise.createPool(
//   `${CONFIG.DATABASE_URL}?ssl={"rejectUnauthorized":false}&multipleStatements=true&dateStrings=true&waitForConnections=true&connectionLimit=99&enableKeepAlive=true&keepAliveInitialDelay=10000`
// );

// console.log(`DB Pool Created.`);

// exports.getMySqlPromiseConnection = async () => {
//   try {
//     // Test the connection
//     await pool.query("SELECT 1");
//     console.log("Pool Connection Successful.");
//     // Return a connection from the pool
//     // This will automatically handle connection management
//     // and reuse connections as needed.
//     console.log("Returning a connection from the pool.");

//     return await pool.getConnection();
//   } catch (error) {
//     console.error("Pool Connection Error: =======>");
//     console.error(error);
//     throw error;
//   }
// };

const { CONFIG } = require("./index");
const mysql = require("mysql2/promise");

const dbUrl = new URL(process.env.DATABASE_URL);
console.log(dbUrl);
const pool = mysql.createPool({
  host: dbUrl.hostname,
  port: Number(dbUrl.port),
  user: dbUrl.username,
  password: dbUrl.password,
  database: dbUrl.pathname.substring(1),
  waitForConnections: true,
  connectionLimit: 99,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000,
  dateStrings: true,
  multipleStatements: true,
  ssl: {
    rejectUnauthorized: false,
  },
});

console.log(`DB Pool Created.`);

exports.getMySqlPromiseConnection = async () => {
  try {
    await pool.query("SELECT 1");
    console.log("Pool Connection Successful.");
    return await pool.getConnection();
  } catch (error) {
    console.error("Pool Connection Error: =======>");
    console.error(error);
    throw error;
  }
};
