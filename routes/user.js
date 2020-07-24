const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');
router.get('/sign-in', userController.signin);
router.get('/sign-up', userController.signup);
module.exports = router;