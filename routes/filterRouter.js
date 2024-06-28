const express= require('express');
const filterController=require('../controller/filterController');
const filterRouter=express.Router();

filterRouter.get('/',filterController.getFilteredUsers2);

module.exports = filterRouter;