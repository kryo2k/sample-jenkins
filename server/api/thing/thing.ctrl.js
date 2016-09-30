'use strict';

const
Thing = require('./thing.model');

exports.search = (req, res, next) => {
  Thing.find(req.query, Thing.FIELDS_PROFILE.join(' '), (err, docs) => {
    if(err) return next(err);
    res.json(docs);
  });
};

exports.detail = (req, res, next) => {
  res.json(req.thing.detail);
};

exports.create = (req, res, next) => {

  var
  thing = new Thing();

  thing.applyUpdates(req.body).save((err) => {
    if(err) return next(err);
    res.json(thing.profile);
  });
};

exports.update = (req, res, next) => {
  req.thing.applyUpdates(req.body).save((err) => {
    if(err) return next(err);
    res.sendStatus(200);
  });
};

exports.delete = (req, res, next) => {
  req.thing.remove((err) => {
    if(err) return next(err);
    res.sendStatus(200);
  });
};
