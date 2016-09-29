'use strict';

const
router  = require('express').Router(),
config = require('../config');

router.use('/thing', require('./thing'));

module.exports = router;
