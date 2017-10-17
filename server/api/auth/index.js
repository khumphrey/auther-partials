const router = require('express').Router();

router.use('/me', require('./local'));

router.use('/google', require('./google'));

module.exports = router;