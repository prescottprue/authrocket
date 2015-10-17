var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('request-promise'), require('lodash')) : typeof define === 'function' && define.amd ? define(['request-promise', 'lodash'], factory) : global.AuthRocket = factory(global.request, global._);
})(this, function (request, _) {
	'use strict';

	request = 'default' in request ? request['default'] : request;
	var ___default = 'default' in _ ? _['default'] : _;

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
	var envName = 'prod';

	var Config = (function () {
		function Config() {
			_classCallCheck(this, Config);

			if (!instance) {
				instance = this;
			}
			// console.log({description: 'Config object created.', config: merge(this, defaultConfig), func: 'constructor', obj: 'Config'});
			return _.merge(instance, defaultConfig);
		}

		_createClass(Config, [{
			key: 'logLevel',
			get: function get() {
				return defaultConfig.envs[envName].logLevel;
			}
		}, {
			key: 'envName',
			set: function set(newEnv) {
				envName = newEnv;
				// this.envName = newEnv;
				// console.log('Environment name set:', envName);
			}
		}, {
			key: 'env',
			get: function get() {
				return defaultConfig.envs[envName];
			}
		}]);

		return Config;
	})();

	var config = new Config();

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
				return this.requestWithHeaders('signup', signupData).then(function (res) {
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
			value: function requestWithHeaders(endpoint, data) {
				// if (!_.has(this, ['accountId', 'apiKey', 'realmId'])) {
				//   console.error('Account, apiKey, and realm are required to make a request with headers.', JSON.stringify(this));
				//   return Promise.reject({message: 'Account, apiKey, and realm are required to make a request with headers.'});
				// }
				var options = {
					method: 'POST', //TODO: Handle other request methods
					uri: '' + this.apiUrl + endpoint,
					headers: {
						'X-Authrocket-Account': this.accountId,
						'X-Authrocket-Api-Key': this.apiKey,
						'X-Authrocket-Realm': this.realmId,
						'Accept': 'application/json',
						'Content-Type': 'application/json',
						'User-agent': 'https://github.com/prescottprue/authrocket'
					}
				};
				//Add data to request if it exists
				if (data) {
					options.body = data;
				}
				return request(options).then(function (res) {
					console.log('successful request:', res);
					//TODO: Handle error response
					return res;
				}, function (error) {
					console.error('Error with request:', error);
					return Promise.reject(error);
				});
			}
		}]);

		return AuthRocket;
	})();

	return AuthRocket;
});
//# sourceMappingURL=authrocket.js.map
