var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('lodash'), require('superagent')) : typeof define === 'function' && define.amd ? define(['lodash', 'superagent'], factory) : global.AuthRocket = factory(global._, global.superagent);
})(this, function (_, superagent) {
  'use strict';

  var ___default = 'default' in _ ? _['default'] : _;
  superagent = 'default' in superagent ? superagent['default'] : superagent;

  var defaultConfig = {
    accountId: process.env.AUTHROCKET_ACCOUNT_ID,
    apiKey: process.env.AUTHROCKET_API_KEY,
    realmId: process.env.AUTHROCKET_REALM_ID,
    jwtSecret: process.env.AUTHROCKET_JWT_SECRET,
    apiUrl: process.env.AUTHROCKET_API_URL || 'https://api-e1.authrocket.com/v1/',
    jsUrl: process.env.AUTHROCKET_JS_URL
  };
  var configInstance = null; //Singleton variable

  var Config = (function () {
    function Config() {
      _classCallCheck(this, Config);

      if (!configInstance) {
        configInstance = this;
      }
      // console.log({description: 'Config object created.', config: merge(this, defaultConfig), func: 'constructor', obj: 'Config'});
      return _.merge(configInstance, defaultConfig);
    }

    _createClass(Config, [{
      key: 'applySettings',
      value: function applySettings(settingsData) {
        var _this = this;

        _.each(_.keys(settingsData), function (key) {
          _this[key] = settingsData[key];
        });
      }

      //Map getters that handle removing trailing slash of urls
    }, {
      key: 'urls',
      get: function get() {
        var jsUrl = this.jsUrl;
        var apiUrl = this.apiUrl;
        return Object.defineProperties({}, {
          api: {
            get: function get() {
              return apiUrl ? removeTrailingSlash(apiUrl) : null;
            },
            configurable: true,
            enumerable: true
          },
          js: {
            get: function get() {
              return jsUrl ? removeTrailingSlash(jsUrl) : null;
            },
            configurable: true,
            enumerable: true
          }
        });
      }
    }]);

    return Config;
  })();

  var config = new Config();

  function removeTrailingSlash(url) {
    if (!_.isString(url)) {
      logger.error({ description: 'Slash can only be removed from strings.', func: 'removeTrailingSlash', file: 'config' });
      return url;
    }
    return url.replace(/\/$/, '');
  }

  //Set default log level to debug
  var logLevel = 'debug';
  //Set log level from config
  if (config.logLevel) {
    logLevel = config.logLevel;
  }
  var _logger = {
    log: function log(logData) {
      var msgArgs = buildMessageArgs(logData);
      if (config.envName == 'production') {
        runConsoleMethod('log', msgArgs);
      } else {
        runConsoleMethod('log', msgArgs);
      }
    },
    info: function info(logData) {
      var msgArgs = buildMessageArgs(logData);
      if (config.envName == 'production') {
        runConsoleMethod('info', msgArgs);
      } else {
        runConsoleMethod('info', msgArgs);
      }
    },
    warn: function warn(logData) {
      var msgArgs = buildMessageArgs(logData);
      if (config.envName == 'production') {
        runConsoleMethod('warn', msgArgs);
      } else {
        runConsoleMethod('warn', msgArgs);
      }
    },
    debug: function debug(logData) {
      var msgArgs = buildMessageArgs(logData);
      if (config.envName == 'production') {
        // runConsoleMethod('debug', msgArgs);
        //Do not display console debugs in production
      } else {
          runConsoleMethod('debug', msgArgs);
        }
    },
    error: function error(logData) {
      var msgArgs = buildMessageArgs(logData);
      if (config.envName == 'production') {
        //TODO: Log to external logger
        runConsoleMethod('error', msgArgs);
      } else {
        runConsoleMethod('error', msgArgs);
      }
    }
  };

  function runConsoleMethod(methodName, methodData) {
    //Safley run console methods or use console log
    if (methodName && console[methodName]) {
      return console[methodName].apply(console, methodData);
    } else {
      return console.log.apply(console, methodData);
    }
  }
  function buildMessageArgs(logData) {
    var msgStr = '';
    var msgObj = {};
    //TODO: Attach time stamp
    //Attach location information to the beginning of message
    if (___default.isObject(logData)) {
      if (logLevel == 'debug') {
        if (___default.has(logData, 'func')) {
          if (___default.has(logData, 'obj')) {
            //Object and function provided
            msgStr += '[' + logData.obj + '.' + logData.func + '()]\n ';
          } else if (___default.has(logData, 'file')) {
            msgStr += '[' + logData.file + ' > ' + logData.func + '()]\n ';
          } else {
            msgStr += '[' + logData.func + '()]\n ';
          }
        }
      }
      //Print each key and its value other than obj and func
      ___default.each(___default.omit(___default.keys(logData)), function (key, ind, list) {
        if (key != 'func' && key != 'obj') {
          if (key == 'description' || key == 'message') {
            msgStr += logData[key];
          } else if (___default.isString(logData[key])) {
            // msgStr += key + ': ' + logData[key] + ', ';
            msgObj[key] = logData[key];
          } else {
            //Print objects differently
            // msgStr += key + ': ' + logData[key] + ', ';
            msgObj[key] = logData[key];
          }
        }
      });
      msgStr += '\n';
    } else if (___default.isString(logData)) {
      msgStr = logData;
    }
    var msg = [msgStr, msgObj];

    return msg;
  }

  var request = {
    get: function get(endpoint, queryData) {
      var req = superagent.get(endpoint);
      if (queryData) {
        req.query(queryData);
      }
      // req = addAuthHeader(req);
      return handleResponse(req);
    },
    post: function post(endpoint, data) {
      var req = superagent.post(endpoint).send(data);
      // req = addAuthHeader(req);
      return handleResponse(req);
    },
    put: function put(endpoint, data) {
      var req = superagent.put(endpoint, data);
      // req = addAuthHeader(req);
      return handleResponse(req);
    },
    del: function del(endpoint, data) {
      var req = superagent.put(endpoint, data);
      // req = addAuthHeader(req);
      return handleResponse(req);
    }
  };

  //Wrap response in promise that has error handling
  function handleResponse(req) {
    return new Promise(function (resolve, reject) {
      req.end(function (err, res) {
        if (!err) {
          // logger.log({description: 'Response:', response:res, func:'handleResponse', file: 'request'});
          return resolve(res.body);
        } else {
          if (err.status == 401) {
            _logger.warn({ description: 'Unauthorized. You must be signed into make this request.', func: 'handleResponse' });
          }
          if (err && err.response) {
            return reject(err.response.text);
          }
          _logger.warn({ description: 'Error response.', error: err, func: 'handleResponse' });
          return reject(err);
        }
      });
    });
  }

  var AuthRocket = (function () {
    function AuthRocket(settings) {
      _classCallCheck(this, AuthRocket);

      if (settings && ___default.isString(settings)) {
        this.apiUrl = settings;
      } else {
        //Set api url if within settings
        config.applySettings(settings);
      }
    }

    /** Login as a user
     * @param {Object} loginData - Object containing data to signup with
     * @param {String} loginData.email - Email of new user
     * @param {String} loginData.password - Password of new user
     * @return {Promise}
     */

    _createClass(AuthRocket, [{
      key: 'login',
      value: function login(loginData) {

        return request.post(config.urls.js + '/login', loginData).then(function (res) {
          _logger.log({ description: 'successful login', res: res });
          if (___default.has(res, 'error')) {
            _logger.error({ description: 'Error signing up.', error: res.error, res: res, func: 'signup', obj: 'AuthRocket' });
            return Promise.reject(res.error);
          }
          return res;
        }, function (error) {
          _logger.error({ description: 'Error logging in.', error: error });
          return Promise.reject(error);
        });
      }

      /** Logout a user
       * @param {Object} token - Object containing data to signup with
       * @return {Promise}
       */
    }, {
      key: 'logout',
      value: function logout(token) {
        console.log('config:', config.urls.js);
        return request.post(config.urls.js + '/logout', { token: token }).then(function (res) {
          _logger.log({ description: 'successful logout', res: res });
          if (___default.has(res, 'error')) {
            _logger.error({ description: 'Error signing up.', error: res.error, res: res, func: 'signup', obj: 'AuthRocket' });
            return Promise.reject(res.error);
          }
          return res;
        }, function (err) {
          _logger.error({ description: 'Error logging out.', error: err });
          return Promise.reject(err);
        });
      }

      /** Signup a new user
       * @param {Object} signupData - Object containing data to signup with
       * @param {String} signupData.email - Email of new user
       * @param {String} signupData.password - Password of new user
       * @param {String} signupData.confirm - Object containing data to signup with
       * @return {Promise}
       */
    }, {
      key: 'signup',
      value: function signup(signupData) {
        return request.post(config.urls.js + '/signup', signupData).then(function (res) {
          if (___default.has(res, 'error')) {
            _logger.error({ description: 'Error signing up.', error: res.error, res: res, func: 'signup', obj: 'AuthRocket' });
            return Promise.reject(res.error);
          }
          _logger.log({ description: 'Successful signup', res: res, func: 'signup', obj: 'AuthRocket' });
          return res;
        }, function (err) {
          _logger.error({ description: 'Error signing up.', error: err, func: 'signup', obj: 'AuthRocket' });
          return Promise.reject(err);
        });
      }

      /** Verify an existing token is valid
       * @param {String} token - JSON Web Token to verify
       * @return {Promise}
       */
    }, {
      key: 'verify',
      value: function verify(token) {
        return request.post(config.urls.js + '/sessions/' + token).then(function (res) {
          _logger.log({ description: 'token is valid', res: res, func: 'verify', obj: 'AuthRocket' });
          if (___default.has(res, 'error')) {
            _logger.error({ description: 'Error signing up.', error: res.error, res: res, func: 'signup', obj: 'AuthRocket' });
            return Promise.reject(res.error);
          }
          return res;
        }, function (err) {
          _logger.error({ description: 'Token is invalid.', error: err, func: 'verify', obj: 'AuthRocket' });
          return Promise.reject(err);
        });
      }

      /** Attach AuthRocket request headers and make a request
       * @param {String} endpoint - Endpoint to send request to
       * @param {Object|String} data - Request data
       * @return {Promise}
       */
    }, {
      key: 'requestWithHeaders',
      value: function requestWithHeaders(url, data) {}
    }]);

    return AuthRocket;
  })();

  return AuthRocket;
});
//# sourceMappingURL=authrocket.js.map
