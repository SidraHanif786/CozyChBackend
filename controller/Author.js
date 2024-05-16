const status = require("http-status");
const sql = require("mssql");

const getAllAuthors = async (req, res) => {
  try {
    const resp =
      await sql.query`SELECT A.NAME AS AuthorName, COUNT(AB.BOOKID) AS BookCount
                  FROM AUTHORS A 
                  LEFT JOIN AUTHORBOOK AB ON A.AUTHORID = AB.AUTHORID
                  GROUP BY A.NAME`;
    res.status(status.OK).send({ data: resp });
  } catch (error) {
    res.status(status.BAD_REQUEST).send({ message: error.message });
  }
};

const getTopAuthors = async (req, res) => {
  try {
    const resp = await sql.query`SELECT TOP 5
      A.NAME AS AuthorName,
      B.TITLE AS BookTitle,
      B.READCOUNT
      FROM
      AUTHORS A
      INNER JOIN
      BOOKS B ON A.AUTHORID = B.AUTHOR
      ORDER BY
      B.READCOUNT DESC`;
    res.status(status.OK).send({ data: resp });
  } catch (error) {
    res.status(status.BAD_REQUEST).send({ message: error.message });
  }
};

module.exports = {
  getAllAuthors, getTopAuthors
};
