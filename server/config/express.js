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
errorHandler   = require('../lib/middleware/error-handler'),
config         = require('./index');

module.exports = (app, server) => {

  const isDevOrTest = config.isDevelopment || config.isTesting;

  // setup view renderer
  app.engine('html', ejs.renderFile);

  // setup the app environment
  app.set('env',     config.env);
  app.set('appPath', config.path.client);
  app.set('view engine', 'html');
  app.set('views', path.join(config.path.server, 'views'));

  // include some useful middleware
  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cookieParser());
  app.use(favicon(path.join(config.path.server, 'resource/favicon.png')));
  app.use(express.static(config.path.client));
  app.use(morgan(config.isDevelopment ? 'dev' : 'common'));
  app.use(errorHandler({
    showLineNumber: isDevOrTest,
    showFileName:   isDevOrTest,
    showMessage:    isDevOrTest,
    showStackTrace: isDevOrTest
  }));

  if (config.isDevelopment) { // only use if in dev-mode
    app.use(liveReload());
  }

  // configure all routes
  app.use('/api', require('../api'));
};
