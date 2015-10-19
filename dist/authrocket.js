var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('lodash'), require('superagent')) : typeof define === 'function' && define.amd ? define(['lodash', 'superagent'], factory) : global.AuthRocket = factory(global._, global.superagent);
})(this, function (_, superagent) {
  'use strict';

  var ___default = 'default' in _ ? _['default'] : _;
  superagent = 'default' in superagent ? superagent['default'] : superagent;

  var defaultConfig = {
    envName: 'local',
    accountId: process.env.AUTHROCKET_ACCOUNT_ID,
    apiKey: process.env.AUTHROCKET_API_KEY,
    realmId: process.env.AUTHROCKET_REALM_ID,
    jwtSecret: process.env.AUTHROCKET_JWT_SECRET,
    urls: {
      api: process.env.AUTHROCKET_API_URL || 'https://api-e1.authrocket.com/v1/',
      login: process.env.AUTHROCKET_LOGIN_URL,
      signup: process.env.AUTHROCKET_SIGNUP_URL,
      jslib: process.env.AUTHROCKET_JSLIB_URL
    }
  };
  var instance = null;

  var Config = function Config() {
    _classCallCheck(this, Config);

    if (!instance) {
      instance = this;
    }
    // console.log({description: 'Config object created.', config: merge(this, defaultConfig), func: 'constructor', obj: 'Config'});
    return _.merge(instance, defaultConfig);
  }
  // get logLevel() {
  // 	return defaultConfig.envs[envName].logLevel;
  // }
  // set envName(newEnv) {
  // 	envName = newEnv;
  // 	// this.envName = newEnv;
  // 	// console.log('Environment name set:', envName);
  // }
  // get env() {
  // 	return defaultConfig.envs[envName];
  // }
  ;

  var config = new Config();

  //Set default log level to debug
  var logLevel = 'debug';
  //Set log level from config
  if (config.logLevel) {
    logLevel = config.logLevel;
  }
  var logger = {
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

  function handleResponse(req) {
    return new Promise(function (resolve, reject) {
      req.end(function (err, res) {
        if (!err) {
          // logger.log({description: 'Response:', response:res, func:'handleResponse', file: 'request'});
          return resolve(res.body);
        } else {
          if (err.status == 401) {
            logger.warn({ description: 'Unauthorized. You must be signed into make this request.', func: 'handleResponse' });
          }
          if (err && err.response) {
            return reject(err.response.text);
          }
          logger.warn({ description: 'Error response.', error: err, func: 'handleResponse' });
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
        this.apiUrl = ___default.has(settings, 'apiUrl') ? settings.apiUrl : config.urls.api;
        this.apiKey = ___default.has(settings, 'apiKey') ? settings.apiKey : config.apiKey;
        this.accountId = ___default.has(settings, 'accountId') ? settings.accountId : config.accountId;
        this.realmId = ___default.has(settings, 'realmId') ? settings.realmId : config.realmId;
        this.jsApiUrl = ___default.has(settings, 'jsApiUrl') ? settings.urls.jslib : config.urls.jslib;
        this.signupUrl = ___default.has(settings, 'signupUrl') ? settings.urls.signup : config.urls.signup || config.urls.api;
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
        return this.requestWithHeaders('login', loginData).then(function (res) {
          console.log('successful login', res);
          //TODO: Handle error response
          return res;
        }, function (error) {
          console.error('Error logging in.', error);
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
        return this.requestWithHeaders('logout', { token: token }).then(function (res) {
          console.log('successful logout', res);
          //TODO: Handle error response
          return res;
        }, function (error) {
          console.error('Error logging out.', error);
          return Promise.reject(error);
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
        return request.post(this.jsApiUrl + 'signup', signupData).then(function (res) {
          console.log('successful signup', res);
          //TODO: Handle error response
          return res;
        }, function (error) {
          console.error('Error signing up.', error);
          return Promise.reject(error);
        });
      }

      /** Verify an existing token is valid
       * @param {String} token - JSON Web Token to verify
       * @return {Promise}
       */
    }, {
      key: 'verify',
      value: function verify(token) {
        return this.requestWithHeaders('sessions/' + token).then(function (res) {
          console.log('token is valid', res);
          return res;
        }, function (err) {
          console.error('Token is invalid.', err);
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

      // requestWithHeaders(url, data) {
      //   // if (!_.has(this, ['accountId', 'apiKey', 'realmId'])) {
      //   //   console.error('Account, apiKey, and realm are required to make a request with headers.', JSON.stringify(this));
      //   //   return Promise.reject({message: 'Account, apiKey, and realm are required to make a request with headers.'});
      //   // }
      //   let options = {
      //     method: 'post', //TODO: Handle other request methods
      //     headers: {
      //     //   'X-Authrocket-Account': this.accountId,
      //     //   'X-Authrocket-Api-Key': this.apiKey,
      //     //   'X-Authrocket-Realm': this.realmId,
      //       'Accept': 'application/json',
      //       'Content-Type': 'application/json',
      //     //   'User-agent': 'https://github.com/prescottprue/authrocket'
      //     }
      //   };
      //   //Add data to request if it exists
      //   if (data) {
      //     options.body = data;
      //   }
      //   console.log('requesting with options:',url, options);
      //   return fetch(url, options).then((res) => {
      //     if (res.status >= 200 && res.status < 300) {
      //       if (res.error) {
      //         return Promise.reject(res.error);
      //       }
      //       console.log('response with text:', res.json());
      //       return res.json();
      //     } else {
      //       console.log('error response:', res);
      //       var error = new Error(res.statusText);
      //       error.response = res;
      //       return Promise.reject(res.statusText);
      //     }
      //   }).then((text) => {
      //     console.log('Text response:', text);
      //     return text;
      //   });
      // }
    }]);

    return AuthRocket;
  })();

  return AuthRocket;
});
//# sourceMappingURL=authrocket.js.map
