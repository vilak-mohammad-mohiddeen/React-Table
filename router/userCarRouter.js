const express=require('express');
const controller=require('../controller/userCarController')
const router=express.Router();


router.get('/',controller.getUserCarData);
router.get('/filter',controller.getFilteredUserCarData);

module.exports=router;