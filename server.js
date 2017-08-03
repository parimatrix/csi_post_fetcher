/**
 * Created by Parikansh on 01/08/2017.
 */
const express = require('express');
const app = express();
const bp = require('body-parser');
const session = require('express-session');
const path = require('path');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const FB = require('fb');

app.use(express.static('public_static'));
app.use(bp.json());
app.use(bp.urlencoded({extended: true}));
app.use(session({secret: 'secretcsi',
                    resave: false,
                    saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

const route = {
    secure : require('./route/secure')
};

// Every file of secure route is FB authenticated
app.use('/secure',route.secure);


/* USAGE OF PASSPORT.js */

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new FacebookStrategy({
        clientID: '140795106503697',
        clientSecret: '7aa0ade9a2c1a787ee0a4b7d0670e176',
        callbackURL: "http://localhost:5000/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        FB.setAccessToken(accessToken);
        done(null, profile);
    }
));

app.get('/auth/facebook', passport.authenticate('facebook'));

// Passport login authenticate
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { successRedirect: '/secure/posts',
                                        failureRedirect: '/' })
                    );


app.listen(5000,function () {
    console.log("Server is running on 5000");
});