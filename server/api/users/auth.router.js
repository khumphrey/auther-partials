const router = require('express').Router();

const User = require('./user.model');

router.get('/me', (req, res, next) => {
  if (req.session.user) {
    User.findById(req.session.user.id)
    .then(user => res.send(user))
    .catch(next);
  } else {
    res.send(null);
  }
});

module.exports = router;
