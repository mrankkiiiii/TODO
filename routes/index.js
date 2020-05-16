const express = require('express');
const router = express.Router();

// app. use is middleware which is used to passed the form data using express
router.use(express.urlencoded());

const homeController = require('../controllers/home_controller');
router.get('/', homeController.home);
router.post('/create_event',homeController.add_data);

module.exports = router;