const
path   = require('path'),
format = require('util').format,
merge  = require('lodash').merge,
envVariable = (key, defaultVal) => process.env.hasOwnProperty(key) ? process.env[key] : defaultVal,
requiredEnv = (key) => {
  if(!process.env.hasOwnProperty(key)) {
    throw new Error(format('Environment variable (%s) not set.', key));
  }

  return process.env[key];
},
rootPath = path.resolve(path.join(__dirname, '../..')),
CONFIG   = {};

// merge in all defaults
module.exports = exports = merge(CONFIG, {
  env: envVariable('NODE_ENV', 'production'),
  http: {
    addr: envVariable('HTTP_ADDR', 'localhost'),
    port: envVariable('HTTP_PORT', 3000)
  },
  mongo: {
    uri: envVariable('MONGO_URI', 'mongodb://localhost:27017/sample-jenkins'),
    options: {
      // db             - passed to the [underlying driver's db instance](http://mongodb.github.io/node-mongodb-native/2.1/api/Db.html)
      // server         - passed to the [underlying driver's server instance(s)](http://mongodb.github.io/node-mongodb-native/2.1/api/Server.html)
      // replset        - passed to the [underlying driver's ReplSet instance](http://mongodb.github.io/node-mongodb-native/2.1/api/ReplSet.html)
      // user           - username for authentication (if not specified in uri)
      // pass           - password for authentication (if not specified in uri)
      // auth           - options for authentication
      // mongos         - passed to the [underlying driver's mongos options](http://mongodb.github.io/node-mongodb-native/2.1/api/Mongos.html)
      // promiseLibrary - sets the [underlying driver's promise library](http://mongodb.github.io/node-mongodb-native/2.1/api/MongoClient.html)
    }
  },
  path: {
    root:   rootPath,
    server: path.join(rootPath, 'server'),
    client: path.join(rootPath, CONFIG.isProduction
      ? 'dist/client'
      : 'client')
  }
});

CONFIG.isDevelopment = (CONFIG.env === 'development');
CONFIG.isProduction  = (CONFIG.env === 'production');
CONFIG.isTesting     = (CONFIG.env === 'test');
