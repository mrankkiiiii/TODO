const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/user_controller');
router.get('/profile/:id',passport.checkAuthentication ,userController.profile);
router.get('/sign-in', userController.signin);
router.get('/sign-up', userController.signup);
router.post('/create', userController.create);
router.get('/sign-out', userController.destroySession);
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect:'/user/sign-in'}
    ), userController.createSession);
module.exports = router;