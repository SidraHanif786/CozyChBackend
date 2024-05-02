const express = require('express');
const authorController = require('../controller/Author');

const authorRouter = express.Router();

authorRouter.get('/getAll', authorController.getAuthors);

module.exports = authorRouter;