const express = require('express');
const router = express.Router();

const eventController = require('../controllers/event_controller');
// app.use is middleware which is used to passed the form data using express
router.use(express.urlencoded({extended: false}));

// this is the route for home
router.get('/', eventController.home);

// this is the route for delete button
router.post('/delete-contact',eventController.delete_data);

// this is the route for addbutton
router.post('/create-event',eventController.add_data);

module.exports = router;