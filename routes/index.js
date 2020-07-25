// require express to use ejs file
const express = require('express');
const router = express.Router();
const passport = require('passport');
// it is used to connect with homecontroller
const homeController = require('../controllers/home_controller');

router.get('/', homeController.home);
router.use('/user', require('./user'));
router.use('/event', require('./event'));

//exports the route for accessible in other sections
module.exports = router;