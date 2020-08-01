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

//google aouth routes
router.get('/auth/google',passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect: '/user/sign-in'}),userController.createSession);

module.exports = router;