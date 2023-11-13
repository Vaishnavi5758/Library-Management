const path = require('path');

const express = require('express');

const router = express.Router();

const userController = require('../controllers/index');
const { findBooksByName } = require('../controllers/index');


router.get('/', userController.indexPage);

router.post('/AddBookToDB', userController.AddBookToDB);

router.get('/findAllUsersBooks', userController.findAllUsersBooks);

router.get('/findBooksByName', findBooksByName);

router.post('/payFine', userController.payFine);

//router.get('/loadUsers', userController.loadUsers);



//router.delete('/deleteexpense/:id', userController.deleteexpense);


module.exports = router;
