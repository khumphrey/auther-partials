const router = require('express').Router();
const passport = require('passport');

/* Routes won't work until we define the google strategy! */

// Google authentication and login
router.get('/', passport.authenticate('google', { scope: 'email' }));

// handle the callback after Google has authenticated the user
router.get('/verify', passport.authenticate('google', {
  failureRedirect: '/login',
  successRedirect: '/login'
}));

module.exports = router;