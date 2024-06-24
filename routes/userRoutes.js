
const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const filterRouter=require('./filterRouter');

router.use('/filter', filterRouter);
// router.get('/filter',userController.getFilteredUsers)
router.get('/:id', userController.getUserById);
router.get('/', userController.getAllUsers);



module.exports = router;