'use strict';

const
path           = require('path'),
express        = require('express'),
ejs            = require('ejs'),
favicon        = require('serve-favicon'),
morgan         = require('morgan'),
compression    = require('compression'),
bodyParser     = require('body-parser'),
methodOverride = require('method-override'),
cookieParser   = require('cookie-parser'),
liveReload     = require('connect-livereload'),
errors         = require('../errors'),
errorHandler   = require('../lib/middleware/error-handler'),
config         = require('./index');

module.exports = (app, server) => {

  // setup view renderer
  app.engine('html', ejs.renderFile);

  // setup the app environment
  app.set('env',     config.env);
  app.set('view engine', 'html');
  app.set('views', path.join(config.path.server, 'views'));

  // include some useful middleware
  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cookieParser());
  app.use(favicon(path.join(config.path.client, 'assets/favicon.png')));
  app.use(morgan(config.isDevelopment ? 'dev' : 'common'));

  if(config.isDevelopment) { // only use if in dev-mode
    app.use(liveReload());
    app.use(express.static(config.path.temp));
  }

  // add common statics
  app.use(express.static(config.path.client));

  // configure all routes
  app.use('/api', require('../api'));

  // All undefined asset or api routes should return a notFound error message
  app.route('/:url(api|src|bower_components|assets)/*').get(errors.notFound);

  // All other routes should redirect to the index.html
  app.route('/*').get((req, res) => {
    res.sendfile(path.join(config.path.client, 'index.html'));
  });

  // add error handling at the very end
  app.use(errorHandler({
    showStackTrace: config.isDevelopment || config.isTesting
  }));
};
