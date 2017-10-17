const passport = require('passport');
const router = require('express').Router();
const User = require('../db').models.user;


router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id)
	  .then(user => done(null, user))
	  .catch(done);
});

module.exports = router;