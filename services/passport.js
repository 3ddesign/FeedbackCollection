const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys.js');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});
// Function we write to turn user id into a user:
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        });
});

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback'
        },
        (accessToken, refreshToken, profile, done) => {
            //Check is user exists:
            User.findOne({googleId: profile.id}).then(existingUser => {
                if (existingUser) {
                    //we have a user already
                    done(null, existingUser);
                } else {
                    //we do not have a user already
                    new User({googleId: profile.id})
                        .save()
                        .then(user => done(null, user));
                }
            });
        })
);