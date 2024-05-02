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
const authorRouter = require('./router/Author')

app.use("/author", authorRouter)

const port = process.env.PORT || 4001;
app.listen(port, () => {
    console.log('Server is running at port', port);
});

