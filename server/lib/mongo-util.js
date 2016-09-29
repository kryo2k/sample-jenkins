'use strict';

var
mongoose = require('mongoose'),
_ = require('lodash'),
ObjectId = mongoose.Types.ObjectId,
Schema = mongoose.Schema;

function isObjectId(n) {

  if(_.isString(n)) {
    return /^[a-f0-9]{24}$/i.test(n);
  }
  else if(typeof n === 'number' || typeof n === 'boolean' || typeof n === 'undefined') {
    return false;
  }

  return ObjectId.isValid(n) || (n instanceof ObjectId);
}

function getObjectId(n) {
  if(!n) return false;

  if(isObjectId(n)) {
    return new ObjectId(n);
  }

  if(_.isObject(n) && (!!n._id || !!n.id)) {
    return new ObjectId(n._id || n.id);
  }

  return false;
}

function arrayOfObjectId (m) {
  if(!m) return false;
  if(!_.isArray(m)) {
    m = [m];
  }

  var
  filtered = m.reduce(function (p, c) {
    var objectId = getObjectId(c);
    if(objectId !== false) {
      p.push(objectId);
    }
    return p;
  }, []);

  if(!filtered.length) {
    return false;
  }

  return filtered;
}

function isIdEqual(a, b) {
  var
  aO = getObjectId(a),
  bO = getObjectId(b);

  if(!aO || !bO) {
    return false;
  }

  return aO.equals(bO);
};

function isDocument(m) {
  if(!m || !getObjectId(m)) return false;
  return typeof(m.isSelected) === 'function';
}

function hasAllSelected(d, fields) {
  if(!isDocument(d)) return false;

  fields = explodeSelectFields(fields, false);

  if(!fields.length) return true;

  return fields.every(function (field) { // return true if not stopped
    return d.isSelected(field); // stop after first not found
  });
}

function hasAnySelected(d, fields) {
  if(!isDocument(d)) return false;

  fields = explodeSelectFields(fields, false);

  if(!fields.length) return true;

  return !fields.every(function (field) { // return true if stopped early
    return !d.isSelected(field); // stop after first found
  });
}

function isField(field) {
  return _.isString(field) && field.length > 0;
}

function isNegatedField(field) {
  return isField(field) && field.substring(0, 1) === '-';
}

function explodeSelectFields(select, allowNegated) {
  var
  result = [],
  push   = function (item) {
    if(!isField(item) || result.indexOf(item) > -1) return; // ignore inval/dup
    if(!allowNegated && isNegatedField(item)) return; // ignore negated field
    result.push(item); // safe to add
  };

  if(_.isString(select)) {
    select.split(/\s+/g).forEach(function (fieldName) {
      push(fieldName);
    });
  }
  else if (_.isArray(select)) {
    select.forEach(function(c) {
      if(!_.isString(c)) return; // only accept strings at this point
      push(c);
    });
  }

  return result;
}

function parseSelect(select) {
  select = explodeSelectFields(select, true);

  if(select.length === 0) {
    return { empty: true, white: false, black: false, gray: false, fields: select };
  }

  var
  // all select fields have non-negating fields
  isWhiteList = !select.every(function (field) { return isNegatedField(field); }),
  // all select fields are negating
  isBlackList = !select.every(function (field) { return !isNegatedField(field); }),
  // both white and black
  isGrayList  = (isWhiteList && isBlackList);

  // override with gray check
  isWhiteList = (isWhiteList && !isGrayList);
  isBlackList = (isBlackList && !isGrayList);

  return {
    empty:  false,
    white:  isWhiteList,
    black:  isBlackList,
    gray:   isGrayList,
    fields: select
  };
}

function fieldSelect(select, included) { // by default, all included are whitelisted

  var
  result    = explodeSelectFields(included, false),
  selecting = explodeSelectFields(select, true),
  pluck = function (item) {
    var exist = result.indexOf(item);
    if(exist === -1) return; // nothing to do
    result.splice(exist, 1); // remove from the existing field array
  },
  push = function (item) {
    if(result.indexOf(item) > -1) return; // ignore dup
    result.push(item);
  };

  selecting.forEach(function (item) {
    if(isNegatedField(item)) {         // remove from existing fields
      return pluck(item.substring(1)); // pluck triming off the negate
    }

    push(item); // otherwise safe to add
  });

  return result;
}

function schemaFields(schema, select, filterFunction) {
  select = parseSelect(select);

  if(select.gray) {
    throw new Error('Select can not be a "gray"-list of fields. Must be either white or black.');
  }

  var
  result = [];

  if((schema instanceof Schema)) {
    var
    validPaths   = Object.keys(schema.paths),
    included = [];

    if(_.isFunction(filterFunction)) {
      validPaths = validPaths.filter(function (path) {
        return filterFunction(path, schema.paths[path]);
      });
    }

    if(select.black || select.empty) { // only merge in schema paths if blacklist or empty select
      included = validPaths;
    }

    result = fieldSelect(select.fields.filter(function (item) { // must always be valid paths
      return validPaths.indexOf(isNegatedField(item) ? item.substring(1) : item) > -1;
    }), included);
  }

  return result;
}

function sortDefinition(sortBy) {
  var
  D_ASC   =  1,
  D_DESC  = -1,
  directionNorm = function (v) {
    if(_.isString(v)) {
      v = v.toLowerCase();
      return (v==='-1'||v==='-'||v==='desc'||v==='dsc') ? D_DESC : D_ASC;
    }
    else if(_.isNumber(v)) {
      return (v === -1) ? D_DESC : D_ASC;
    }
    return D_ASC;
  },
  result = {};

  if(_.isString (sortBy)) {
    sortBy.split(/\s+/).forEach(function (path) {
      var
      dir = D_ASC, property;

      if(['-','+'].indexOf(path[0]) > -1) {
        dir      = directionNorm(path[0]);
        property = path.substring(1);
      }
      else if(/^[a-z0-9\._]+\:/i.test(path)) {
        var matches = path.match(/^([a-z0-9\._]+)\:(.*)/i);
        property = matches[1];
        dir      = directionNorm(matches[2]);
      }
      else {
        property = path;
      }

      result[property] = dir;
    });
  }
  else if(_.isObject(sortBy)) {
    Object.keys(sortBy).forEach(function (path) {
      result[path] = directionNorm(sortBy[path]);
    });
  }

  return result;
}

function indexOfObjectId(arr, objectId) {
  var foundIndex = -1;
  if(!_.isArray(arr)) return -1;

  arr.every(function (testId, index) {
    if(isIdEqual(testId, objectId)) {
      foundIndex = index;
    }

    return foundIndex === -1;
  });

  return foundIndex;
}

function inAllowed(requestIds, allowedIds, criterion) {
  requestIds = arrayOfObjectId(requestIds);
  allowedIds = arrayOfObjectId(allowedIds);
  criterion = _.isPlainObject(criterion)  ? criterion  : {};

  if(!requestIds || !allowedIds) { // set $in to empty array
    criterion['$in'] = [];
    return criterion;
  }

  // enforce filtering by allowed
  criterion['$in'] = requestIds.filter(function (id) {
    return indexOfObjectId(allowedIds, id) > -1;
  });

  return criterion;
}

module.exports = {
  isObjectId: isObjectId,
  isIdEqual: isIdEqual,
  getObjectId: getObjectId,
  isDocument: isDocument,
  hasAllSelected: hasAllSelected,
  hasAnySelected: hasAnySelected,
  arrayOfObjectId: arrayOfObjectId,
  fieldSelect: fieldSelect,
  schemaFields: schemaFields,
  sortDefinition: sortDefinition,
  indexOfObjectId: indexOfObjectId,
  inAllowed: inAllowed
};

