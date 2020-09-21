const mysql = require("mysql");
const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: "",
  database: process.env.DB,
});
connection.connect();
module.exports = connection;

// const conn = mysql.createPool({
//   host: "83.136.216.67",
//   user: "u6083019_ncip",
//   password: "mbahcip123",
//   database: "u6083019_ci_market_place",
// });
