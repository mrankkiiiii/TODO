// require express to use ejs file
const express = require('express');
const router = express.Router();

// app.use is middleware which is used to passed the form data using express
router.use(express.urlencoded({extended: false}));

// it is used to connect with homecontroller
const homeController = require('../controllers/home_controller');

// this is the route for home
router.get('/', homeController.home);

// this is the route for delete button
router.post('/delete-contact',homeController.delete_data);

// this is the route for addbutton
router.post('/create-event',homeController.add_data);

//exports the route for accessible in other sections
module.exports = router;