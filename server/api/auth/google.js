const router = require('express').Router();
const passport = require('passport');
const User = require('../../db').models.user;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
  		  
// configuring the strategy (credentials verification callback)
passport.use(
  new GoogleStrategy({
    clientID: process.env.GOOG_CLIENT_ID,
    clientSecret: process.env.GOOG_SECRET,
    callbackURL: '/api/auth/google/verify'
  },
  function (token, refreshToken, profile, done) {
    // // workshop started you with this code, challenge was where to go from here:
    // console.log('---', 'in verification callback', profile, '---');
    // done();
    var info = {
      name: profile.displayName,
      email: profile.emails[0].value,
      photo: profile.photos ? profile.photos[0].value : undefined
    };
    User.findOrCreate({
      where: {googleId: profile.id},
      defaults: info
    })
    .spread(user => {
      done(null, user); // this passes user info on to serializeUser (in passport.middleware.js)
    })
    .catch(done);
  })
);

// Google authentication and login
router.get('/', passport.authenticate('google', { scope: 'email' }));

// handle the callback after Google has authenticated the user
router.get('/verify', passport.authenticate('google', {
  failureRedirect: '/login',
  successRedirect: '/login'
}));

module.exports = router;