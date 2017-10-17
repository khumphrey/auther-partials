const router = require('express').Router();
const User = require('../../db').models.user;
const HttpError = require('../../utils/HttpError');

// login, i.e. 'you remember `me`, right?'
router.put('/', function(req, res, next) {
  const { email, password } = req.body;
  User.findOne({
      where: { email, password }
    })
    .then(user => {
      if (!user) {
        throw new HttpError(401);
      } else {
        req.session.userId = user.id;
        res.json(user);
      }
    })
    .catch(next);
});

// signup, i.e. "let `me` introduce myself"
router.post('/', function (req, res, next) {
  const { email, password } = req.body;
  User.findOrCreate({
    where: { email },
    defaults: { password }
  })
  .spread((user, created) => {
    if (created) {
      req.session.userId = user.id;
      res.json(user);
    } else {
      throw new HttpError(401);
    }
  });
});

// logout, i.e. "please just forget `me`"
router.delete('/', function (req, res, next) {
  req.session.destroy(); // destroys entire session
  // delete req.session.userId; // deletes one item on session
  res.sendStatus(204);
});
module.exports = router;