// require express to use ejs file
const express = require('express');
const router = express.Router();
const passport = require('passport');
// it is used to connect with homecontroller
const userController = require('../controllers/user_controller');

router.get('/',passport.checkAuthentication, userController.signin);
router.use('/user', require('./user'));
router.use('/event', require('./event'));

//exports the route for accessible in other sections
module.exports = router;