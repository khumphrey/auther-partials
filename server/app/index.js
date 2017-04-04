'use strict';

var app = require('express')();
var path = require('path');
var session = require('express-session');

const User = require('../api/users/user.model');

// "Enhancing" middleware (does not send response, server-side effects only)

app.use(require('./logging.middleware'));

app.use(require('./body-parsing.middleware'));

app.use(session({
  // this mandatory configuration ensures that session IDs are not predictable
  secret: 'tongiscool', // or whatever you like
  // these options are recommended and reduce session concurrency issues
  resave: false,
  saveUninitialized: false
}));

app.use((req, res, next) => {
  console.log('session', req.session);
  next();
});

// "Responding" middleware (may send a response back to client)

app.use('/api', require('../api/api.router'));

var validFrontendRoutes = ['/', '/stories', '/users', '/stories/:id', '/users/:id', '/signup', '/login'];
var indexPath = path.join(__dirname, '..', '..', 'browser', 'index.html');
validFrontendRoutes.forEach(function (stateRoute) {
  app.get(stateRoute, function (req, res) {
    res.sendFile(indexPath);
  });
});

app.post('/login', (req, res, next) => {
  User.findOne({
    where: req.body
  })
  .then(user => {
    if (!user) {
      res.sendStatus(401);
    } else {
      req.session.user = user;
      res.status(200).send(user);
    }
  })
  .catch(next);
});

app.post('/logout', (req, res, next) => {
  if (req.session.user) delete req.session.user;
  res.sendStatus(200);
});

app.use(require('./statics.middleware'));

app.use(require('./error.middleware'));

module.exports = app;
