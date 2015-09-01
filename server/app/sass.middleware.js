'use strict';

var sassMiddleware = require('node-sass-middleware'),
	router = require('express').Router(),
	path = require('path');

router.use('/browser', sassMiddleware({
	src: path.join(__dirname, '..', '..', 'browser'),
	debug: true
}));

module.exports = router;