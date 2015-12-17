var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
	var envName = 'prod';
	var level = null;
	var configInstance = null; //Singleton variable

	var Config = (function () {
		function Config() {
			_classCallCheck(this, Config);

			if (!configInstance) {
				configInstance = this;
			}
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
			key: 'logLevel',
			set: function set(setLevel) {
				level = setLevel;
			},
			get: function get() {
				if (level) {
					return level;
				}
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
			logger.error({
				description: 'Slash can only be removed from strings.',
				func: 'removeTrailingSlash', file: 'config'
			});
			return url;
		}
		return url.replace(/\/$/, '');
	}

	var logger$1 = {
		log: function log(logData) {
			var msgArgs = buildMessageArgs(logData);
			if (config.logLevel === 'trace') {
				runConsoleMethod('log', msgArgs);
			}
		},
		debug: function debug(logData) {
			var msgArgs = buildMessageArgs(logData);
			if (config.logLevel === 'trace' || config.logLevel === 'debug') {
				runConsoleMethod('debug', msgArgs);
			}
		},
		info: function info(logData) {
			if (config.logLevel === 'trace' || config.logLevel === 'debug' || config.logLevel === 'info') {
				var msgArgs = buildMessageArgs(logData);
				runConsoleMethod('info', msgArgs);
			}
		},
		warn: function warn(logData) {
			var msgArgs = buildMessageArgs(logData);
			if (config.logLevel === 'trace' || config.logLevel === 'debug' || config.logLevel === 'info' || config.logLevel === 'warn') {
				runConsoleMethod('warn', msgArgs);
			}
		},
		error: function error(logData) {
			var msgArgs = buildMessageArgs(logData);
			if (config.logLevel === 'trace' || config.logLevel === 'debug' || config.logLevel === 'info' || config.logLevel === 'warn' || config.logLevel === 'error' || config.logLevel === 'fatal') {
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
			if (config.logLevel == 'debug') {
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
			___default.each(___default.omit(___default.keys(logData)), function (key) {
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
		/** Run get request with provided data
   * @param {String} endpoint - Endpoint to send request to
   * @param {Object|String} data - Query data
   * @param {Boolean} includeHeaders - Whether or not to include auth headers
   * @return {Promise}
   */
		get: function get(endpoint, queryData, includeHeaders) {
			var req = superagent.get(endpoint);
			if (queryData) {
				req.query(queryData);
			}
			req = attachHeaders(req, includeHeaders);
			return handleResponse(req);
		},
		/** Run POST request with provided data
   * @param {String} endpoint - Endpoint to send request to
   * @param {Object|String} data - Request data
   * @param {Boolean} includeHeaders - Whether or not to include auth headers
   * @return {Promise}
   */
		post: function post(endpoint, data, includeHeaders) {
			var req = superagent.post(endpoint).send(data);
			req = attachHeaders(req, includeHeaders);
			return handleResponse(req);
		},
		/** Run PUT request with provided data
   * @param {String} endpoint - Endpoint to send request to
   * @param {Object|String} data - Request data
   * @param {Boolean} includeHeaders - Whether or not to include auth headers
   * @return {Promise}
   */
		put: function put(endpoint, data, includeHeaders) {
			var req = superagent.put(endpoint, data);
			req = attachHeaders(req, includeHeaders);
			return handleResponse(req);
		},
		/** Run DELETE request with provided data
   * @param {String} endpoint - Endpoint to send request to
   * @param {Object|String} data - Request data
   * @param {Boolean} includeHeaders - Whether or not to include auth headers
   * @return {Promise}
   */
		del: function del(endpoint, data, includeHeaders) {
			var req = superagent.put(endpoint, data);
			req = attachHeaders(req, includeHeaders);
			return handleResponse(req);
		}
	};

	/** Attach headers to request
  * @private
  */
	function attachHeaders(req, include) {
		if (typeof include === 'undefined' || include) {
			return addAuthRocketHeaders(req);
		}
		return req;
	}
	/** Wrap response in promise that has error handling
  * @private
  */
	function handleResponse(req) {
		return new Promise(function (resolve, reject) {
			req.end(function (err, res) {
				if (!err) {
					// logger.log({description: 'Response:', response:res, func:'handleResponse', file: 'request'});
					return resolve(res.body);
				} else {
					logger$1.warn({ description: 'Error response.', error: err, func: 'handleResponse' });
					if (err.status == 401) {
						logger$1.warn({ description: 'Unauthorized. You must be signed into make this request.', func: 'handleResponse' });
					}
					if (err && err.response) {
						return reject(err.response.text);
					}
					if (err && err.errno) {
						// logger.warn({description: 'Does not exist.', error: err, func: 'handleResponse'});
						return reject(err.errno);
					}
					return reject(err);
				}
			});
		});
	}
	/** Add auth rocket headers to request
  * @private
  */
	function addAuthRocketHeaders(req) {
		var newReq = req;
		if (!config.accountId || !config.apiKey || !config.realmId) {
			logger$1.error({ description: 'AccountId, apiKey, and realmId are required.', func: 'addAuthRocketHeaders' });
			return req;
		}
		var headers = {
			'X-Authrocket-Account': config.accountId,
			'X-Authrocket-Api-Key': config.apiKey,
			'X-Authrocket-Realm': config.realmId,
			// 'Accept': 'application/json',
			'Content-Type': 'application/json'
			// 'User-agent': 'https://github.com/prescottprue/authrocket' //To provide AuthRocket a contact
		};
		logger$1.log({ description: 'addAuthRocketHeaders called.', config: config });
		//Add each header to the request
		_.each(_.keys(headers), function (key) {
			newReq = addHeaderToReq(req, key, headers[key]);
		});
		logger$1.log({ description: 'addAuthRocketHeaders request created.', func: 'addAuthRocketHeaders' });
		return newReq;
	}
	/** Add header to an existing request
  * @private
  */
	function addHeaderToReq(req, headerName, headerVal) {
		if (!headerName || !headerVal) {
			logger$1.error({ description: 'Header name and value required to add header to request.', func: 'addHeaderToReq', obj: 'request' });
			return;
		}
		logger$1.log({ description: 'Header value set.', headerName: headerName, headerVal: headerVal });
		return req.set(headerName, headerVal);
	}

	var Action = (function () {
		function Action(actionName, actionData, endpoint) {
			_classCallCheck(this, Action);

			this.name = actionName;
			this.endpoint = endpoint ? endpoint : '' + this.name;
			this.init(actionData);
		}

		_createClass(Action, [{
			key: 'init',
			value: function init(actionData) {
				logger$1.log({ description: 'Init action called.', actionData: actionData, func: 'url', obj: 'Action' });
				this.isList = actionData ? false : true;
				if (!this.isList) {
					this.actionData = actionData;
					if (_.isString(actionData)) {
						//String username provided
						this.id = this.actionData;
					} else if (_.has(actionData, 'id') || _.has(actionData, 'username')) {
						//Check for object to have id or username
						this.id = actionData.id ? actionData.id : actionData.username;
					} else {
						logger$1.warn({ description: 'Invalid action data object.', func: 'constructor', obj: 'Action' });
						this.isList = false;
						// return Promise.reject('Invalid this.actionData');
					}
				}
			}
		}, {
			key: 'get',

			/** Get
    * @return {Promise}
    */
			value: function get() {
				return request.get(this.url).then(function (res) {
					logger$1.log({ description: 'Get responded successfully.', res: res, func: 'get', obj: 'Action' });
					if (_.has(res, 'error')) {
						logger$1.error({ description: 'Error in get response.', error: res.error, res: res, func: 'get', obj: 'Action' });
						return Promise.reject(res.error);
					}
					return res.collection ? res.collection : res;
				}, function (error) {
					logger$1.error({ description: 'Error in GET request.', error: error, func: 'get', obj: 'Action' });
					return Promise.reject(error);
				});
			}

			/** Add a new user
    * @param {Object} newData - Object containing data to create with
    * @return {Promise}
    */
		}, {
			key: 'add',
			value: function add(newData) {
				return request.post(this.url, newData).then(function (res) {
					logger$1.log({ description: 'Add request responded successfully.', res: res, func: 'add', obj: 'Action' });
					if (_.has(res, 'error')) {
						logger$1.error({ description: 'Error creating new user.', error: res.error, res: res, func: 'add', obj: 'Action' });
						return Promise.reject(res.error);
					}
					logger$1.log({ description: 'Add successful.', res: res, func: 'add', obj: 'Action' });
					return res;
				}, function (err) {
					logger$1.error({ description: 'Error creating new user.', error: err, func: 'add', obj: 'Action' });
					return Promise.reject(err);
				});
			}
		}, {
			key: 'update',
			value: function update(updateData) {
				return request.put(this.url, updateData).then(function (res) {
					if (_.has(res, 'error')) {
						logger$1.error({ description: 'Error in update request.', error: res.error, res: res, func: 'update', obj: 'Action' });
						return Promise.reject(res.error);
					}
					logger$1.log({ description: 'Update successful.', res: res, func: 'update', obj: 'Action' });
					return res;
				}, function (err) {
					logger$1.error({ description: 'Error in update request.', error: err, func: 'update', obj: 'Action' });
					return Promise.reject(err);
				});
			}

			/** Remove
    * @return {Promise}
    */
		}, {
			key: 'remove',
			value: function remove() {
				return request.del(this.url).then(function (res) {
					if (_.has(res, 'error')) {
						logger$1.error({ description: 'Error in request for removal.', error: res.error, res: res, func: 'remove', obj: 'Action' });
						return Promise.reject(res.error);
					}
					logger$1.log({ description: 'Remove successfully.', res: res, func: 'remove', obj: 'Action' });
					return res;
				}, function (err) {
					logger$1.error({ description: 'Error in request for removal.', error: err, func: 'remove', obj: 'Action' });
					return Promise.reject(err);
				});
			}
		}, {
			key: 'url',
			get: function get() {
				var url = this.isList ? config.urls.api + '/' + this.endpoint : config.urls.api + '/' + this.endpoint + '/' + this.id;
				logger$1.log({ description: 'Url created.', url: url, func: 'url', obj: 'Action' });
				return url;
			}
		}]);

		return Action;
	})();

	var _Realms = (function (_Action) {
		_inherits(_Realms, _Action);

		function _Realms(actionData) {
			_classCallCheck(this, _Realms);

			_get(Object.getPrototypeOf(_Realms.prototype), 'constructor', this).call(this, 'realms', actionData);
		}

		/** Get realms
   * @return {Promise}
   * @example
   * //list realms
   * authrocket.Realms().get().then(function(realmsList){
   *    console.log('List of realms', realmsList);
   * });
   */
		/** Get a specific realm
   * @param {String} token - String JWT token of logged in user
   * @return {Promise}
   * @example
   * //Realms based on token
   * var realmId = 'rl_0v1zTHXhtNgmDaXaDYSAqx';
   * authrocket.Realms(realmId).then(function(realm){
   *    console.log('Realm data:', realm);
   * });
   */
		/** Add a realm
   * @param {String} token - String JWT token of logged in user
   * @return {Promise}
   * @example
   * var realmData = {name: 'Test Realm'};
   * authrocket.Realms().add(realmData).then(function(){
   *    console.log('Logged out successfully.');
   * });
   */
		/** Update a realm
   * @param {String} token - String JWT token of logged in user
   * @return {Promise}
   * @example
   * authrocket.Realms().update().then(function(){
   *    console.log('Logged out successfully.');
   * });
   */
		/** Remove a realm
   * @param {String} id - Realm Id
   * @return {Promise}
   * @example
   * var realmId = 'rl_0v1zTHXhtNgmDaXaDYSAqx';
   * authrocket.Realms(realmId).remove().then(function(){
   *    console.log('Realm removed successfully.');
   * });
   */
		return _Realms;
	})(Action);

	var _Users = (function (_Action2) {
		_inherits(_Users, _Action2);

		function _Users(actionData) {
			_classCallCheck(this, _Users);

			_get(Object.getPrototypeOf(_Users.prototype), 'constructor', this).call(this, 'users', actionData);
		}

		/** Get realms
   * @return {Promise}
   * @example
   * //list realms
   * authrocket.Users().get().then(function(realmsList){
   *    console.log('List of realms', realmsList);
   * });
   */
		/** Get a specific realm
   * @param {String} token - String JWT token of logged in user
   * @return {Promise}
   * @example
   * //Users based on token
   * var realmId = 'rl_0v1zTHXhtNgmDaXaDYSAqx';
   * authrocket.Users(realmId).then(function(realm){
   *    console.log('Realm data:', realm);
   * });
   */
		/** Add a realm
   * @param {String} token - String JWT token of logged in user
   * @return {Promise}
   * @example
   * var realmData = {name: 'Test Realm'};
   * authrocket.Users().add(realmData).then(function(){
   *    console.log('Logged out successfully.');
   * });
   */
		/** Update a realm
   * @param {String} token - String JWT token of logged in user
   * @return {Promise}
   * @example
   * authrocket.Users().update().then(function(){
   *    console.log('Logged out successfully.');
   * });
   */
		/** Remove a realm
   * @param {String} id - Realm Id
   * @return {Promise}
   * @example
   * var realmId = 'rl_0v1zTHXhtNgmDaXaDYSAqx';
   * authrocket.Users(realmId).remove().then(function(){
   *    console.log('Realm removed successfully.');
   * });
   */
		return _Users;
	})(Action);

	var _Credentials = (function (_Action3) {
		_inherits(_Credentials, _Action3);

		function _Credentials(actionData) {
			_classCallCheck(this, _Credentials);

			_get(Object.getPrototypeOf(_Credentials.prototype), 'constructor', this).call(this, 'credentials', actionData);
		}

		/** Get Users
   * @return {Promise}
   * @example
   * authrocket.Users().get().then(function(UsersList){
   *    console.log('List of Users', UsersList);
   * });
   */
		/** Get a specific realm
   * @param {String} token - String JWT token of logged in user
   * @return {Promise}
   * @example
   * //Realms based on token
   * var userId = 'rl_0v1zTHXhtNgmDaXaDYSAqx';
   * authrocket.Users(userId).then(function(user){
   *    console.log('Realm data:', user);
   * });
   */
		/** Add a user
   * @param {String} token - String JWT token of logged in user
   * @return {Promise}
   * @example
   * var userData = {name: 'Test Realm'};
   * authrocket.Users().add(userData).then(function(){
   *    console.log('Logged out successfully.');
   * });
   */
		/** Update a user
   * @param {String} token - String JWT token of logged in user
   * @return {Promise}
   * @example
   * authrocket.Users().update().then(function(){
   *    console.log('Logged out successfully.');
   * });
   */
		/** Remove a Realm
   * @param {String} id - Realm Id
   * @return {Promise}
   * @example
   * var username = 'rl_0v1zTHXhtNgmDaXaDYSAqx';
   * authrocket.Users(username).remove().then(function(){
   *    console.log('Realm removed successfully.');
   * });
   */
		return _Credentials;
	})(Action);

	var _SignupTokens = (function (_Action4) {
		_inherits(_SignupTokens, _Action4);

		function _SignupTokens(actionData) {
			_classCallCheck(this, _SignupTokens);

			_get(Object.getPrototypeOf(_SignupTokens.prototype), 'constructor', this).call(this, 'signup_tokens', actionData);
		}

		/** Get SignupTokens
   * @return {Promise}
   * @example
   * authrocket.SignupTokens().get().then(function(usersList){
   *    console.log('List of realms', realmsList);
   * });
   */
		/** Get a specific Signup Token
   * @return {Promise}
   * @example
   * //SignupTokens based on token
   * var signupTokenId = 'rl_0v1zTHXhtNgmDaXaDYSAqx';
   * authrocket.SignupTokens(signupTokenId).then(function(signupToken){
   *    console.log('Realm data:', signupToken);
   * });
   */
		/** Add a Signup Token
   * @param {Object}  - Signup Token data
   * @return {Promise}
   * @example
   * var signupTokenData = {name: 'Test Realm'};
   * authrocket.SignupTokens().add(signupTokenData).then(function(){
   *    console.log('Logged out successfully.');
   * });
   */
		/** Update a signupToken
   * @return {Promise}
   * @example
   * authrocket.SignupTokens().update().then(function(){
   *    console.log('Logged out successfully.');
   * });
   */
		/** Remove a signupToken
   * @param {String} id - Realm Id
   * @return {Promise}
   * @example
   * var signupToken = 'rl_0v1zTHXhtNgmDaXaDYSAqx';
   * authrocket.SignupTokens(signupToken).remove().then(function(){
   *    console.log('Realm removed successfully.');
   * });
   */
		return _SignupTokens;
	})(Action);

	var _Orgs = (function (_Action5) {
		_inherits(_Orgs, _Action5);

		function _Orgs(actionData) {
			_classCallCheck(this, _Orgs);

			_get(Object.getPrototypeOf(_Orgs.prototype), 'constructor', this).call(this, 'orgs', actionData);
		}

		/** Get Orgs
   * @return {Promise}
   * @example
   * //list Orgs
   * authrocket.Realms().get().then(function(OrgsList){
   *    console.log('List of Orgs', OrgsList);
   * });
   */
		/** Get a specific org
   * @param {String} name - Name or id of organization
   * @return {Promise}
   * @example
   * var orgId = 'rl_0v1zTHXhtNgmDaXaDYSAqx';
   * authrocket.Realms(orgId).then(function(org){
   *    console.log('Realm data:', org);
   * });
   */
		/** Add a org
   * @param {Object} orgData - Data associated with organization
   * @param {String} name - Name of org
   * @return {Promise}
   * @example
   * var orgData = {name: 'Admins'};
   * authrocket.Realms().add(orgData).then(function(){
   *    console.log('Logged out successfully.');
   * });
   */
		/** Update a org
   * @return {Promise}
   * @example
   * authrocket.Realms().update().then(function(){
   *    console.log('Logged out successfully.');
   * });
   */
		/** Remove a org
   * @param {String} id - Org Id
   * @return {Promise}
   * @example
   * var orgId = 'rl_0v1zTHXhtNgmDaXaDYSAqx';
   * authrocket.Realms(orgId).remove().then(function(){
   *    console.log('Realm removed successfully.');
   * });
   */
		return _Orgs;
	})(Action);

	var _Memberships = (function (_Action6) {
		_inherits(_Memberships, _Action6);

		function _Memberships(actionData) {
			_classCallCheck(this, _Memberships);

			_get(Object.getPrototypeOf(_Memberships.prototype), 'constructor', this).call(this, 'memberships', actionData);
		}

		return _Memberships;
	})(Action);

	var _AuthProviders = (function (_Action7) {
		_inherits(_AuthProviders, _Action7);

		function _AuthProviders(actionData) {
			_classCallCheck(this, _AuthProviders);

			_get(Object.getPrototypeOf(_AuthProviders.prototype), 'constructor', this).call(this, 'auth_providers', actionData);
		}

		return _AuthProviders;
	})(Action);

	var _ConnectedApps = (function (_Action8) {
		_inherits(_ConnectedApps, _Action8);

		function _ConnectedApps(actionData) {
			_classCallCheck(this, _ConnectedApps);

			_get(Object.getPrototypeOf(_ConnectedApps.prototype), 'constructor', this).call(this, 'login_policies', actionData);
		}

		return _ConnectedApps;
	})(Action);

	var _Hooks = (function (_Action9) {
		_inherits(_Hooks, _Action9);

		function _Hooks(actionData) {
			_classCallCheck(this, _Hooks);

			_get(Object.getPrototypeOf(_Hooks.prototype), 'constructor', this).call(this, 'app_hooks', actionData);
		}

		return _Hooks;
	})(Action);

	var _Sessions = (function (_Action10) {
		_inherits(_Sessions, _Action10);

		function _Sessions(actionData) {
			_classCallCheck(this, _Sessions);

			_get(Object.getPrototypeOf(_Sessions.prototype), 'constructor', this).call(this, 'session', actionData);
		}

		return _Sessions;
	})(Action);

	var _Events = (function (_Action11) {
		_inherits(_Events, _Action11);

		function _Events(actionData) {
			_classCallCheck(this, _Events);

			_get(Object.getPrototypeOf(_Events.prototype), 'constructor', this).call(this, 'events', actionData);
		}

		return _Events;
	})(Action);

	var _Notifications = (function (_Action12) {
		_inherits(_Notifications, _Action12);

		function _Notifications(actionData) {
			_classCallCheck(this, _Notifications);

			_get(Object.getPrototypeOf(_Notifications.prototype), 'constructor', this).call(this, 'notifications', actionData);
		}

		return _Notifications;
	})(Action);

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
   * @param {String} loginData.username - Username of new user
   * @param {String} loginData.password - Password of new user
   * @return {Promise}
   * @example
   * //login as a user
   * var userData = {username: 'testuser1', password: 'secretstring'};
   * authrocket.login(userData).then(function(newUser){
   *    console.log('Successful signup:', newUser);
   * });
   */

		_createClass(AuthRocket, [{
			key: 'login',
			value: function login(loginData) {
				if (!___default.has(loginData, 'username') || !___default.has(loginData, 'password')) {
					logger$1.error({
						description: 'Username and password are required to login.',
						func: 'login', obj: 'AuthRocket'
					});
					return Promise.reject('Username/Email and password are required.');
				}
				logger$1.log({
					description: 'Calling login.', url: config.urls.js + '/login',
					loginData: loginData, func: 'login', obj: 'AuthRocket'
				});
				return request.post(config.urls.js + '/login', loginData, false).then(function (res) {
					if (___default.has(res, 'error')) {
						logger$1.error({
							description: 'Error logging in.', error: res.error,
							res: res, func: 'login', obj: 'AuthRocket'
						});
						return Promise.reject(res.error);
					}
					if (___default.has(res, 'errno')) {
						var error = res.errno;
						var description = 'Error logging in.';
						if (error === 'ENOTFOUND') {
							error = 'User not found.';
							description = error;
						}
						logger$1.error({
							description: error, error: res.errno, res: res,
							func: 'login', obj: 'AuthRocket'
						});
						return Promise.reject(error);
					}
					return res;
				}, function (err) {
					logger$1.error({
						description: 'Error logging in.', error: err,
						func: 'login', obj: 'AuthRocket'
					});
					if (err === 'ENOTFOUND') {
						err = 'User not found.';
					}
					return Promise.reject(err);
				});
			}

			/** Logout a user
    * @param {String} token - String JWT token of logged in user
    * @return {Promise}
    * @example
    * //logout based on token
    * var token = 'b89787f98728rcn8279.898er89qb8bsf.98basdfasd';
    * authrocket.logout(token).then(function(){
    *    console.log('Logged out successfully.');
    * });
    */
		}, {
			key: 'logout',
			value: function logout(token) {
				if (!token || !___default.isString(token)) {
					logger$1.error({
						description: 'Token string is required to logout.',
						func: 'logout', obj: 'AuthRocket'
					});
					return Promise.reject('Valid token is required to logout.');
				}
				return request.post(config.urls.js + '/logout', { token: token }, false).then(function (res) {
					if (___default.has(res, 'error') || ___default.has(res, 'errno')) {
						logger$1.error({
							description: 'Error logging out.', error: res.error || res.errno,
							res: res, func: 'logout', obj: 'AuthRocket'
						});
						return Promise.reject(res.error || res.errno);
					}
					logger$1.log({
						description: 'Successful logout.', res: res,
						func: 'logout', obj: 'AuthRocket'
					});
					return res;
				}, function (err) {
					logger$1.error({
						description: 'Error logging out.', error: err
					});
					return Promise.reject(err);
				});
			}

			/** Signup a new user
    * @param {Object} signupData - Object containing data to signup with
    * @param {String} signupData.email - Email of new user
    * @param {String} signupData.password - Password of new user
    * @param {String} signupData.confirm - Object containing data to signup with
    * @return {Promise}
    * @example
    * //signup
    * var userData = {username: 'testuser1', email: 'test@test.com', password: 'secretstring'};
    * authrocket.signup(userData).then(function(newUser){
    *    console.log('Successful signup:', newUser);
    * });
    */
		}, {
			key: 'signup',
			value: function signup(signupData) {
				if (!___default.has(signupData, 'username') && !___default.has(signupData, 'email') || !___default.has(signupData, 'username')) {
					logger$1.error({
						description: 'Username/Email and password are required to login.',
						func: 'login', obj: 'AuthRocket'
					});
					return Promise.reject('Username/Email and password are required.');
				}
				return request.post(config.urls.js + '/signup', signupData).then(function (res) {
					if (___default.has(res, 'error') || ___default.has(res, 'errno')) {
						logger$1.error({
							description: 'Error signing up.', error: res.error || res.errno,
							res: res, func: 'signup', obj: 'AuthRocket'
						});
						return Promise.reject(res.error || res.errno);
					}
					logger$1.log({
						description: 'Successful signup', res: res,
						func: 'signup', obj: 'AuthRocket'
					});
					return res;
				}, function (err) {
					logger$1.error({
						description: 'Error signing up.', error: err,
						func: 'signup', obj: 'AuthRocket'
					});
					return Promise.reject(err);
				});
			}

			/** Verify an existing token is valid
    * @param {String} token - JSON Web Token to verify
    * @param {String} expand - Values to expand (memberships and/or token)
    * @return {Promise}
    * @example
    * //verify token and return membership and token data
    * var token = 'b89787f98728rcn8279.898er89qb8bsf.98basdfasd';
    * authrocket.verify(token , 'memberships,token').then(function(response){
    *    console.log('token is valid. User data:', response);
    * });
    */
		}, {
			key: 'verify',
			value: function verify(token) {
				return request.get(config.urls.api + '/sessions/' + token).then(function (res) {
					logger$1.log({
						description: 'Token/Session is valid.', res: res,
						func: 'verify', obj: 'AuthRocket'
					});
					if (___default.has(res, 'error')) {
						logger$1.error({
							description: 'Error verifying token/session.',
							error: res.error, res: res, func: 'verify', obj: 'AuthRocket'
						});
						return Promise.reject(res.error);
					}
					return res;
				}, function (err) {
					logger$1.error({
						description: 'Token/Session is invalid.', error: err,
						func: 'verify', obj: 'AuthRocket'
					});
					return Promise.reject(err);
				});
			}

			/** Realms action namespace
    *
    */
		}, {
			key: 'Realms',
			value: function Realms(actionData) {
				return new _Realms(actionData);
			}

			/** Users action namespace
    * @example
    * //Get users list
    * authrocket.Users().get().then(function(loadedUser){
    *  console.log('User found:', loadedUser);
    * });
    * //Get user by username
    * authrocket.User('someguy1').get().then(function(loadedUser){
    *  console.log('User found:', loadedUser);
    * });
    */
		}, {
			key: 'Users',
			value: function Users(actionData) {
				return new _Users(actionData);
			}

			/** Credentials action namespace
    *
    */
		}, {
			key: 'Credentials',
			value: function Credentials(actionData) {
				return new _Credentials(actionData);
			}

			/** SignupTokens action namespace
    *
    */
		}, {
			key: 'SignupTokens',
			value: function SignupTokens(actionData) {
				return new _SignupTokens(actionData);
			}

			/** Orgs action namespace
    *
    */
		}, {
			key: 'Orgs',
			value: function Orgs(actionData) {
				return new _Orgs(actionData);
			}

			/** Memberships action namespace
    *
    */
		}, {
			key: 'Memberships',
			value: function Memberships(actionData) {
				return new _Memberships(actionData);
			}

			/** AuthProviders action namespace
    *
    */
		}, {
			key: 'AuthProviders',
			value: function AuthProviders(actionData) {
				return new _AuthProviders(actionData);
			}

			/** ConnectedApps action namespace
    *
    */
		}, {
			key: 'ConnectedApps',
			value: function ConnectedApps(actionData) {
				return new _ConnectedApps(actionData);
			}

			/** Hooks action namespace
    *
    */
		}, {
			key: 'Hooks',
			value: function Hooks(actionData) {
				return new _Hooks(actionData);
			}

			/** Sessions action namespace
    *
    */
		}, {
			key: 'Sessions',
			value: function Sessions(actionData) {
				return new _Sessions(actionData);
			}

			/** Events action namespace
    *
    */
		}, {
			key: 'Events',
			value: function Events(actionData) {
				return new _Events(actionData);
			}

			/** Notifications action namespace
    *
    */
		}, {
			key: 'Notifications',
			value: function Notifications(actionData) {
				return new _Notifications(actionData);
			}
		}]);

		return AuthRocket;
	})();

	return AuthRocket;
});
//# sourceMappingURL=authrocket.js.map
