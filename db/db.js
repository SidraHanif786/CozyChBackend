const sql = require("mssql");
require("dotenv").config();

const config = {
  database: process.env.MSSQL_DATABASE,
  server: process.env.MSSQL_SERVER,
  user: process.env.MSSQL_USERNAME,
  password: process.env.MSSQL_PASSWORD,
  options: {
    trustedConnection: true,
    trustServerCertificate: true,
  },
};

const sqlConn = () => {
  sql
    .connect(config)
    .then(() => {
      console.log("MSSQL DB Connected");
    })
    .catch((err) => {
      console.error("ERROR IN DB CONNECTION", err);
    });
};

module.exports = { sqlConn };
