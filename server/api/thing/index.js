'use strict';

const
router  = require('express').Router(),
ctrl    = require('./thing.ctrl'),
mw      = require('./thing.middleware');

router.param('thingId', mw.thingFromParam());

router.get('/',            ctrl.search);
router.get('/:thingId',    ctrl.detail);
router.post('/',           ctrl.create);
router.post('/:thingId',   ctrl.update);
router.delete('/:thingId', ctrl.delete);

module.exports = router;
