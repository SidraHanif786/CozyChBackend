const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sqlConn } = require('./db/db');
require("dotenv").config();
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json()); // for parsing application/json
app.use(cors());
sqlConn();

//routers
const authorRouter = require('./router/Author');
const bookRouter = require('./router/Book');
const activitiesRouter = require('./router/Activities');

app.use("/author", authorRouter)
app.use("/book", bookRouter)
app.use("/activities", activitiesRouter)



const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log('Server is running at port', port);
});

