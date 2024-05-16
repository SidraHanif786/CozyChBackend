const status = require("http-status");
const sql = require("mssql");

const getChallenges = async (req, res) => {
  try {
    const resp = await sql.query`SELECT TOP 3 FROM CHALLENGE`;
    res.status(status.OK).send({ data: resp });
  } catch (error) {
    res.status(status.BAD_REQUEST).send({ message: error.message });
  }
};

const getEvents = async (req, res) => {
  try {
    const resp =
      await sql.query`SELECT TOP 4 EVENTID, TITLE, DATE, LOCATION, DESCRIPTION FROM EVENTS
      WHERE DATE > GETDATE() ORDER BY DATE ASC`;
    res.status(status.OK).send({ data: resp });
  } catch (error) {
    res.status(status.BAD_REQUEST).send({ message: error.message });
  }
};

module.exports = {
  getChallenges,
  getEvents,
};
