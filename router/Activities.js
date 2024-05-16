const express = require('express');
const activitiesController = require('../controller/Activities');

const activitiesRouter = express.Router();

activitiesRouter.get('/getCh', activitiesController.getChallenges );
activitiesRouter.get('/getEv', activitiesController.getEvents );


module.exports = activitiesRouter;