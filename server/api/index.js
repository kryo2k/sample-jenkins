'use strict';

const
router  = require('express').Router(),
config = require('../config');

router.all('/thing', require('./thing'));

module.exports = router;
