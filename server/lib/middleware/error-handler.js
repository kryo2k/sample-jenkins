'use strict';

const
merge   = require('lodash').merge,
isError = require('util').isError;

module.exports = (_options) => {
  const options = merge({
    showStackTrace: false,
    showMessage:    true
  }, _options);

  return (error, req, res, next) => {
    var code = 500;

    if(!isError(error)) {
      console.warn('Non-error was sent to error handler: %j', error);
      return res.sendStatus(code);
    }

    const
    response = {
      type:    error.name,
      message: options.showMessage ? error.message : 'An error has occurred.'
    };

    if(options.showStackTrace && error.hasOwnProperty('stack')) {
      response.stack = error.stack;
    }

    return res.status(code).json(response);
  };
}
