'use strict';

const
Promise          = require('bluebird'),
http             = require('http'),
express          = require('express'),
mongoose         = require('mongoose'),
config           = require('./config'),
configureExpress = require('./config/express');

// setup mongoose to use bluebird promises by default
mongoose.Promise = Promise;

// setup mongoose debugging
mongoose.set('debug', config.isDevelopment || config.isTesting);

// connect to mongo database
mongoose.connect(config.mongo.uri, config.mongo.options, (err) => {
  if(err) throw err;

  const
  app    = express(),
  server = http.createServer(app);

  // do some app bootstrapping
  configureExpress(app, server);

  // Start HTTP server
  server.listen(config.http.port, config.http.addr, (err) => {
    if(err) throw err;

    console.log('HTTP server listening on %s:%d (env: %s)', config.http.addr, config.http.port, app.get('env'));
  });
});
