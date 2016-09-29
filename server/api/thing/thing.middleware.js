'use strict';

const
format = require('util').format,
merge = require('lodash').merge,
mongoUtil = require('../../lib/mongo-util'),
Thing = require('./thing.model');

exports.thingFromParam = (_options) => {
  const options = merge({
    property: 'thing',
    fields:   null // returns all fields
  }, _options);

  // normalize the fields we'll be selecting according to what's defined in schema
  options.fields = mongoUtil.schemaFields(Thing.schema, options.fields);

  return (req, res, next, paramValue, paramKey) => {

    var
    thingId = mongoUtil.getObjectId(paramValue);

    if(!thingId) {
      return next(new TypeError(format('Thing ID (%s:%j) is not a valid ID.', paramKey, paramValue)));
    }

    Thing.findById(thingId, options.fields, function (err, doc) {
      if(err)  return next(err);
      if(!doc) return next(new ReferenceError(format('Unable to locate thing with id (%s)', thingId)));

      req[options.property] = doc;
      next();
    });
  };
};
