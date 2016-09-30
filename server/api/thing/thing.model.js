'use strict';

const
_        = require('lodash'),
mongoose = require('mongoose'),
Schema   = mongoose.Schema;

var
ThingSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

ThingSchema.virtual('profile')
.get(function () {
  return this.constructor.FIELDS_PROFILE.reduce((p, field) => {
    p[field] = this[field];
    return p;
  }, {});
});

ThingSchema.virtual('detail')
.get(function () {
  return this.constructor.FIELDS_DETAIL.reduce((p, field) => {
    p[field] = this[field];
    return p;
  }, {});
});

ThingSchema.statics = {
  FIELDS_PROFILE: ['_id', 'name'],
  FIELDS_DETAIL:  ['_id', 'name', 'created']
};

ThingSchema.methods = {
  applyUpdates: function (updates) {
    if(!_.isObject(updates)) return this;

    // iterate thru "updateable" keys
    ['name'].forEach((item) => {
      if(!updates.hasOwnProperty(item)) return;

      // apply update to model
      this[item] = updates[item];
    });

    return this;
  }
};

module.exports = mongoose.model('Thing', ThingSchema);
