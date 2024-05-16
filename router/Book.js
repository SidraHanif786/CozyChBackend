const express = require('express');
const bookController = require('../controller/Book');

const bookRouter = express.Router();

bookRouter.get('/getTopB', bookController.getTopBooks);
bookRouter.get('/getAllB', bookController.getAllBooks);
bookRouter.get('/getAllG', bookController.getAllGenre);
bookRouter.get('/getFilterB', bookController.getFilterBooks);

bookRouter.get('/getGenR', bookController.getGenRecom);
bookRouter.get('/getUserR', bookController.getUserRecom);


module.exports = bookRouter;