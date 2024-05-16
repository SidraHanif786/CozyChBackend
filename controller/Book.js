const status = require("http-status");
const sql = require("mssql");

const getTopBooks = async (req, res) => {
  try {
    const resp = await sql.query`SELECT TOP 6 B.TITLE, B.READCOUNT FROM BOOKS B
                               ORDER BY B.READCOUNT DESC;`;
    res.status(status.OK).send({ data: resp });
  } catch (error) {
    res.status(status.BAD_REQUEST).send({ message: error.message });
  }
};

const getAllBooks = async (req, res) => {
  try {
    const resp = await sql.query`SELECT
    B.BOOKID,
    B.TITLE AS BookTitle,
    B.AUTHOR,
    B.PUBLISHDATE,
    B.SYNOPSIS,
    B.PUBLISHER,
    B.READCOUNT,
    B.TOTALPAGES,
    R.REVIEWID,
    R.REVIEWS,
    RAT.RATINGID,
    RAT.RATING
FROM
    BOOKS B
LEFT JOIN
    REVIEWS R ON B.BOOKID = R.BOOKID
LEFT JOIN
    RATINGS RAT ON B.BOOKID = RAT.BOOKID
WHERE
    B.BOOKID =@BookID`;
    res.status(status.OK).send({ data: resp });
  } catch (error) {
    res.status(status.BAD_REQUEST).send({ message: error.message });
  }
};

const getAllGenre = async (req, res) => {
  try {
    const resp = await sql.query`SELECT
    G.NAME AS GenreName,
    COUNT(BG.BOOKID) AS BookCount
FROM
    GENRE G
LEFT JOIN
    BOOKGENRE BG ON G.GENREID = BG.GENREID
GROUP BY G.NAME;`;
    res.status(status.OK).send({ data: resp });
  } catch (error) {
    res.status(status.BAD_REQUEST).send({ message: error.message });
  }
};

const getFilterBooks = async (req, res) => {
  try {
    const resp = await sql.query`SELECT
    B.BOOKID,
    B.TITLE AS BookTitle,
    A.NAME AS AuthorName,
    G.NAME AS GenreName
FROM
    BOOKS B
INNER JOIN
    AUTHORS A ON B.AUTHOR = A.AUTHORID
INNER JOIN
    BOOKGENRE BG ON B.BOOKID = BG.BOOKID
INNER JOIN
    GENRE G ON BG.GENREID = G.GENREID
WHERE
    G.GENREID = @GenreID
    AND A.AUTHORID = @AuthorID
    AND B.TITLE LIKE '%' + @Keyword + '%'`;
    res.status(status.OK).send({ data: resp });
  } catch (error) {
    res.status(status.BAD_REQUEST).send({ message: error.message });
  }
};

const getGenRecom = async (req, res) => {
  try {
    const resp =
      await sql.query`SELECT G.NAME AS Genre, B.TITLE AS BookTitle, B.READCOUNT FROM GENRE G
         INNER JOIN BOOKGENRE BG ON G.GENREID = BG.GENREID
        INNER JOIN BOOKS B ON BG.BOOKID = B.BOOKID
        WHERE B.READCOUNT IN (
        SELECT TOP 4 READCOUNT FROM BOOKS B2
        WHERE B2.BOOKID = B.BOOKID ORDER BY READCOUNT DESC )
            ORDER BY G.NAME, B.READCOUNT DESC`;
    res.status(status.OK).send({ data: resp });
  } catch (error) {
    res.status(status.BAD_REQUEST).send({ message: error.message });
  }
};

const getUserRecom = async (req, res) => {
  try {
    const resp = await sql.query`WITH UserReadingList AS (
      SELECT
          RL.BOOKID,
          B.TITLE AS BookTitle,
          BG.GENREID
      FROM
          READINGLIST RL
      INNER JOIN
          BOOKS B ON RL.BOOKID = B.BOOKID
      INNER JOIN
          BOOKGENRE BG ON B.BOOKID = BG.BOOKID
      WHERE
          RL.READERRID = @UserID
  ),
  GenreTopBooks AS (
      SELECT
          BG.GENREID,
          B.TITLE AS BookTitle,
          B.READCOUNT,
          G.NAME AS Genre,
          (
            SELECT COUNT(*)
            FROM BOOKS B2
            INNER JOIN BOOKGENRE BG2 ON B2.BOOKID = BG2.BOOKID
            WHERE BG2.GENREID = BG.GENREID AND B2.READCOUNT > B.READCOUNT
        ) + 1 AS Rank
    FROM
        BOOKGENRE BG
    INNER JOIN
        BOOKS B ON BG.BOOKID = B.BOOKID
    INNER JOIN
        GENRE G ON BG.GENREID = G.GENREID
)
SELECT
    GTB.Genre,
    GTB.BookTitle,
    GTB.READCOUNT
FROM
    GenreTopBooks GTB
WHERE
    GTB.Rank`;
    res.status(status.OK).send({ data: resp });
  } catch (error) {
    res.status(status.BAD_REQUEST).send({ message: error.message });
  }
};

module.exports = {
  getTopBooks,
  getAllBooks,
  getAllGenre,
  getFilterBooks,
  getGenRecom,
  getUserRecom,
};
