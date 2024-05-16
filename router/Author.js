const express = require('express');
const authorController = require('../controller/Author');

const authorRouter = express.Router();

authorRouter.get('/getTopA', authorController.getTopAuthors);
authorRouter.get('/getAllA', authorController.getAllAuthors);


module.exports = authorRouter;