const express = require('express');
const router = express.Router();
const passport = require('passport');

const eventController = require('../controllers/event_controller');
// app.use is middleware which is used to passed the form data using express
router.use(express.urlencoded({extended: false}));

// this is the route for home
router.get('/',passport.checkAuthentication ,eventController.home);

// this is the route for delete button
router.post('/delete-event',passport.checkAuthentication,eventController.delete_data);

// this is the route for addbutton
router.post('/create-event',passport.checkAuthentication,eventController.add_data);

module.exports = router;