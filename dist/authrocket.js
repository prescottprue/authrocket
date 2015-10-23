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

	var Actions = Object.defineProperties({}, {
		Realms: {
			get: function get() {
				return Realms;
			},
			configurable: true,
			enumerable: true
		},
		Users: {
			get: function get() {
				return Users;
			},
			configurable: true,
			enumerable: true
		},
		Credentials: {
			get: function get() {
				return Credentials;
			},
			configurable: true,
			enumerable: true
		},
		SignupTokens: {
			get: function get() {
				return SignupTokens;
			},
			configurable: true,
			enumerable: true
		},
		Orgs: {
			get: function get() {
				return Orgs;
			},
			configurable: true,
			enumerable: true
		},
		Memberships: {
			get: function get() {
				return Memberships;
			},
			configurable: true,
			enumerable: true
		},
		AuthProviders: {
			get: function get() {
				return AuthProviders;
			},
			configurable: true,
			enumerable: true
		},
		ConnectedApps: {
			get: function get() {
				return ConnectedApps;
			},
			configurable: true,
			enumerable: true
		},
		Hooks: {
			get: function get() {
				return Hooks;
			},
			configurable: true,
			enumerable: true
		},
		Sessions: {
			get: function get() {
				return Sessions;
			},
			configurable: true,
			enumerable: true
		},
		Events: {
			get: function get() {
				return Events;
			},
			configurable: true,
			enumerable: true
		},
		Notifications: {
			get: function get() {
				return Notifications;
			},
			configurable: true,
			enumerable: true
		}
	});

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
			req = addAuthRocketHeaders(req);
			return handleResponse(req);
		},
		post: function post(endpoint, data) {
			var req = superagent.post(endpoint).send(data);
			req = addAuthRocketHeaders(req);
			return handleResponse(req);
		},
		put: function put(endpoint, data) {
			var req = superagent.put(endpoint, data);
			req = addAuthRocketHeaders(req);
			return handleResponse(req);
		},
		del: function del(endpoint, data) {
			var req = superagent.put(endpoint, data);
			req = addAuthRocketHeaders(req);
			return handleResponse(req);
		},
		/** Attach AuthRocket request headers and make a request
   * @param {String} endpoint - Endpoint to send request to
   * @param {Object|String} data - Request data
   * @return {Promise}
   */
		withHeaders: function withHeaders(type, url, data) {
			var req = superagent[type](url);
			req = addAuthRocketHeaders(req);
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
	//Add auth rocket headers to request
	function addAuthRocketHeaders(req) {
		var newReq = req;

		//TODO: Make this work
		if (!config.accountId || !config.apiKey || !config.realmId) {
			_logger.error({ description: 'AccountId, apiKey, and realmId are required.' });
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
		_logger.log({ description: 'addAuthRocketHeaders called.', config: config });

		//Add each header to the request
		_.each(_.keys(headers), function (key) {
			newReq = addHeaderToReq(req, key, headers[key]);
		});
		_logger.log({ description: 'addAuthRocketHeaders request created.', request: newReq });

		return newReq;
	}
	//Add header to an existing request
	function addHeaderToReq(req, headerName, headerVal) {
		if (!headerName || !headerVal) {
			_logger.error({ description: 'Header name and value required to add header to request.', func: 'addHeaderToReq', obj: 'request' });
			return;
		}
		_logger.log({ description: 'Header value set.', headerName: headerName, headerVal: headerVal });
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
				_logger.log({ description: 'Init action called.', actionData: actionData, func: 'url', obj: 'Action' });
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
						_logger.warn({ description: 'Invalid action data object.', func: 'constructor', obj: 'Action' });
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
					_logger.log({ description: 'Get responded successfully.', res: res, func: 'get', obj: 'Action' });
					if (_.has(res, 'error')) {
						_logger.error({ description: 'Error in get response.', error: res.error, res: res, func: 'get', obj: 'Action' });
						return Promise.reject(res.error);
					}
					return res.collection ? res.collection : res;
				}, function (error) {
					_logger.error({ description: 'Error in GET request.', error: error, func: 'get', obj: 'Action' });
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
					_logger.log({ description: 'Add request responded successfully.', res: res, func: 'add', obj: 'Action' });
					if (_.has(res, 'error')) {
						_logger.error({ description: 'Error creating new user.', error: res.error, res: res, func: 'add', obj: 'Action' });
						return Promise.reject(res.error);
					}
					_logger.log({ description: 'Add successful.', res: res, func: 'add', obj: 'Action' });
					return res;
				}, function (err) {
					_logger.error({ description: 'Error creating new user.', error: err, func: 'add', obj: 'Action' });
					return Promise.reject(err);
				});
			}
		}, {
			key: 'update',
			value: function update(updateData) {
				return request.put(this.url, updateData).then(function (res) {
					if (_.has(res, 'error')) {
						_logger.error({ description: 'Error in update request.', error: res.error, res: res, func: 'update', obj: 'Action' });
						return Promise.reject(res.error);
					}
					_logger.log({ description: 'Update successful.', res: res, func: 'update', obj: 'Action' });
					return res;
				}, function (err) {
					_logger.error({ description: 'Error in update request.', error: err, func: 'update', obj: 'Action' });
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
						_logger.error({ description: 'Error in request for removal.', error: res.error, res: res, func: 'remove', obj: 'Action' });
						return Promise.reject(res.error);
					}
					_logger.log({ description: 'Remove successfully.', res: res, func: 'remove', obj: 'Action' });
					return res;
				}, function (err) {
					_logger.error({ description: 'Error in request for removal.', error: err, func: 'remove', obj: 'Action' });
					return Promise.reject(err);
				});
			}
		}, {
			key: 'url',
			get: function get() {
				var url = this.isList ? config.urls.api + '/' + this.endpoint : config.urls.api + '/' + this.endpoint + '/' + this.id;
				_logger.log({ description: 'Url created.', url: url, func: 'url', obj: 'Action' });
				return url;
			}
		}]);

		return Action;
	})();

	var Realms = (function (_Action) {
		_inherits(Realms, _Action);

		function Realms(actionData) {
			_classCallCheck(this, Realms);

			_get(Object.getPrototypeOf(Realms.prototype), 'constructor', this).call(this, 'realms', actionData);
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
		return Realms;
	})(Action);

	var Users = (function (_Action2) {
		_inherits(Users, _Action2);

		function Users(actionData) {
			_classCallCheck(this, Users);

			_get(Object.getPrototypeOf(Users.prototype), 'constructor', this).call(this, 'users', actionData);
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
		return Users;
	})(Action);

	var Credentials = (function (_Action3) {
		_inherits(Credentials, _Action3);

		function Credentials(actionData) {
			_classCallCheck(this, Credentials);

			_get(Object.getPrototypeOf(Credentials.prototype), 'constructor', this).call(this, 'credentials', actionData);
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
		return Credentials;
	})(Action);

	var SignupTokens = (function (_Action4) {
		_inherits(SignupTokens, _Action4);

		function SignupTokens(actionData) {
			_classCallCheck(this, SignupTokens);

			_get(Object.getPrototypeOf(SignupTokens.prototype), 'constructor', this).call(this, 'signup_tokens', actionData);
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
		return SignupTokens;
	})(Action);

	var Orgs = (function (_Action5) {
		_inherits(Orgs, _Action5);

		function Orgs(actionData) {
			_classCallCheck(this, Orgs);

			_get(Object.getPrototypeOf(Orgs.prototype), 'constructor', this).call(this, 'orgs', actionData);
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
		return Orgs;
	})(Action);

	var Memberships = (function (_Action6) {
		_inherits(Memberships, _Action6);

		function Memberships(actionData) {
			_classCallCheck(this, Memberships);

			_get(Object.getPrototypeOf(Memberships.prototype), 'constructor', this).call(this, 'memberships', actionData);
		}

		return Memberships;
	})(Action);

	var AuthProviders = (function (_Action7) {
		_inherits(AuthProviders, _Action7);

		function AuthProviders(actionData) {
			_classCallCheck(this, AuthProviders);

			_get(Object.getPrototypeOf(AuthProviders.prototype), 'constructor', this).call(this, 'auth_providers', actionData);
		}

		return AuthProviders;
	})(Action);

	var ConnectedApps = (function (_Action8) {
		_inherits(ConnectedApps, _Action8);

		function ConnectedApps(actionData) {
			_classCallCheck(this, ConnectedApps);

			_get(Object.getPrototypeOf(ConnectedApps.prototype), 'constructor', this).call(this, 'login_policies', actionData);
		}

		return ConnectedApps;
	})(Action);

	var Hooks = (function (_Action9) {
		_inherits(Hooks, _Action9);

		function Hooks(actionData) {
			_classCallCheck(this, Hooks);

			_get(Object.getPrototypeOf(Hooks.prototype), 'constructor', this).call(this, 'app_hooks', actionData);
		}

		return Hooks;
	})(Action);

	var Sessions = (function (_Action10) {
		_inherits(Sessions, _Action10);

		function Sessions(actionData) {
			_classCallCheck(this, Sessions);

			_get(Object.getPrototypeOf(Sessions.prototype), 'constructor', this).call(this, 'session', actionData);
		}

		return Sessions;
	})(Action);

	var Events = (function (_Action11) {
		_inherits(Events, _Action11);

		function Events(actionData) {
			_classCallCheck(this, Events);

			_get(Object.getPrototypeOf(Events.prototype), 'constructor', this).call(this, 'events', actionData);
		}

		return Events;
	})(Action);

	var Notifications = (function (_Action12) {
		_inherits(Notifications, _Action12);

		function Notifications(actionData) {
			_classCallCheck(this, Notifications);

			_get(Object.getPrototypeOf(Notifications.prototype), 'constructor', this).call(this, 'notifications', actionData);
		}

		return Notifications;
	})(Action);

	console.log('actions:', Actions);

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
				if (!___default.has(loginData, 'username') && !___default.has(loginData, 'email') || !___default.has(loginData, 'username')) {
					_logger.error({ description: 'Username/Email and password are required to login.', func: 'login', obj: 'AuthRocket' });
					return Promise.reject('Username/Email and password are required.');
				}
				return request.post(config.urls.js + '/login', loginData).then(function (res) {
					_logger.log({ description: 'successful login', res: res });
					if (___default.has(res, 'error')) {
						_logger.error({ description: 'Error logging in.', error: res.error, res: res, func: 'login', obj: 'AuthRocket' });
						return Promise.reject(res.error);
					}
					if (___default.has(res, 'errno')) {
						var error = res.errno;
						var description = 'Error signing up.';
						if (error === 'ENOTFOUND') {
							error = 'User not found.';
							description = error;
						}
						_logger.error({ description: error, error: res.errno, res: res, func: 'login', obj: 'AuthRocket' });
						return Promise.reject(error);
					}
					return res;
				}, function (error) {
					_logger.error({ description: 'Error logging in.', error: error });
					return Promise.reject(error);
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
					_logger.error({ description: 'Token string is required to logout.', func: 'logout', obj: 'AuthRocket' });
					return Promise.reject('Valid token is required to logout.');
				}
				return request.post(config.urls.js + '/logout', { token: token }).then(function (res) {
					if (___default.has(res, 'error') || ___default.has(res, 'errno')) {
						_logger.error({ description: 'Error logging out.', error: res.error || res.errno, res: res, func: 'logout', obj: 'AuthRocket' });
						return Promise.reject(res.error || res.errno);
					}
					_logger.log({ description: 'Successful logout.', res: res, func: 'logout', obj: 'AuthRocket' });
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
					_logger.error({ description: 'Username/Email and password are required to login.', func: 'login', obj: 'AuthRocket' });
					return Promise.reject('Username/Email and password are required.');
				}
				return request.post(config.urls.js + '/signup', signupData).then(function (res) {
					if (___default.has(res, 'error') || ___default.has(res, 'errno')) {
						_logger.error({ description: 'Error signing up.', error: res.error || res.errno, res: res, func: 'signup', obj: 'AuthRocket' });
						return Promise.reject(res.error || res.errno);
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
				return request.get(config.urls.js + '/sessions/' + token).then(function (res) {
					_logger.log({ description: 'Token/Session is valid.', res: res, func: 'verify', obj: 'AuthRocket' });
					if (___default.has(res, 'error')) {
						_logger.error({ description: 'Error verifying token/session.', error: res.error, res: res, func: 'verify', obj: 'AuthRocket' });
						return Promise.reject(res.error);
					}
					return res;
				}, function (err) {
					_logger.error({ description: 'Token/Session is invalid.', error: err, func: 'verify', obj: 'AuthRocket' });
					return Promise.reject(err);
				});
			}

			/** Realms action namespace
    *
    */
		}, {
			key: 'Realms',
			value: function Realms(actionData) {
				return new Actions.Realms(actionData);
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
				return new Actions.Users(actionData);
			}

			/** Credentials action namespace
    *
    */
		}, {
			key: 'Credentials',
			value: function Credentials(actionData) {
				return new Actions.Credentials(actionData);
			}

			/** SignupTokens action namespace
    *
    */
		}, {
			key: 'SignupTokens',
			value: function SignupTokens(actionData) {
				return new Actions.SignupTokens(actionData);
			}

			/** Orgs action namespace
    *
    */
		}, {
			key: 'Orgs',
			value: function Orgs(actionData) {
				return new Actions.Orgs(actionData);
			}

			/** Memberships action namespace
    *
    */
		}, {
			key: 'Memberships',
			value: function Memberships(actionData) {
				return new Actions.Memberships(actionData);
			}

			/** AuthProviders action namespace
    *
    */
		}, {
			key: 'AuthProviders',
			value: function AuthProviders(actionData) {
				return new Actions.AuthProviders(actionData);
			}

			/** ConnectedApps action namespace
    *
    */
		}, {
			key: 'ConnectedApps',
			value: function ConnectedApps(actionData) {
				return new Actions.ConnectedApps(actionData);
			}

			/** Hooks action namespace
    *
    */
		}, {
			key: 'Hooks',
			value: function Hooks(actionData) {
				return new Actions.Hooks(actionData);
			}

			/** Sessions action namespace
    *
    */
		}, {
			key: 'Sessions',
			value: function Sessions(actionData) {
				return new Actions.Sessions(actionData);
			}

			/** Events action namespace
    *
    */
		}, {
			key: 'Events',
			value: function Events(actionData) {
				return new Actions.Events(actionData);
			}

			/** Notifications action namespace
    *
    */
		}, {
			key: 'Notifications',
			value: function Notifications(actionData) {
				return new Actions.Notifications(actionData);
			}
		}]);

		return AuthRocket;
	})();

	return AuthRocket;
});
//# sourceMappingURL=authrocket.js.map
