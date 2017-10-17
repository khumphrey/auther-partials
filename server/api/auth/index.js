const router = require('express').Router();

router.use('/me', require('./local'));

module.exports = router;