const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
// to generate random password
const crypto = require('crypto');
const User = require('../models/user');
// const env = require('./environment');
//tell passport to use new strategy for google login
passport.use(new GitHubStrategy({
        clientID: "fd1ffee9ac93b0aa1d8a",
        clientSecret: "56d754e59d1e7325d3e7de40a19be96b3c8f9d6e",
        callbackURL: "http://localhost:8000/user/auth/github/callback"
    }, function(accessToken, refreshToken, profile, done){
        //find a user
        User.findOne({email: profile.emails[0].value}).exec(function(err,user){
            if(err){ 
                console.log('error in github-stratgey-passport',err);
                return;
            }
            if(user){
                //if found this,then set this user is as req.user
                return done(null, user);
            } else {
                //if not found, create the user and set it as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function(err, user){
                    if(err){ 
                        console.log('error in creating user github-stratgey passport',err);
                        return;
                    }
                    return done(null, user);
                });
            }
        });
    }
));
module.exports = passport;