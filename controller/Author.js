const status = require("http-status");
const sql = require('mssql');

const getAuthors = async (req, res) => {
  try {
    const resp = await sql.query`SELECT * FROM AUTHORS`;
    res.status(status.OK).send({ data: resp });
  } catch (error) {
    res.status(status.BAD_REQUEST).send({ message: error.message });
  }
};

module.exports = {
  getAuthors
};
