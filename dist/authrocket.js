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
	var logger$1 = {
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
						logger$1.warn({ description: 'Unauthorized. You must be signed into make this request.', func: 'handleResponse' });
					}
					if (err && err.response) {
						return reject(err.response.text);
					}
					logger$1.warn({ description: 'Error response.', error: err, func: 'handleResponse' });
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
			logger$1.error({ description: 'AccountId, apiKey, and realmId are required.' });
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
		logger$1.log({ description: 'addAuthRocketHeaders request created.', request: newReq });

		return newReq;
	}
	//Add header to an existing request
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

		return _Realms;
	})(Action);

	var _Users = (function (_Action2) {
		_inherits(_Users, _Action2);

		function _Users(actionData) {
			_classCallCheck(this, _Users);

			_get(Object.getPrototypeOf(_Users.prototype), 'constructor', this).call(this, 'users', actionData);
		}

		return _Users;
	})(Action);

	var _Credentials = (function (_Action3) {
		_inherits(_Credentials, _Action3);

		function _Credentials(actionData) {
			_classCallCheck(this, _Credentials);

			_get(Object.getPrototypeOf(_Credentials.prototype), 'constructor', this).call(this, 'credentials', actionData);
		}

		return _Credentials;
	})(Action);

	var _SignupTokens = (function (_Action4) {
		_inherits(_SignupTokens, _Action4);

		function _SignupTokens(actionData) {
			_classCallCheck(this, _SignupTokens);

			_get(Object.getPrototypeOf(_SignupTokens.prototype), 'constructor', this).call(this, 'signup_tokens', actionData);
		}

		return _SignupTokens;
	})(Action);

	var _Orgs = (function (_Action5) {
		_inherits(_Orgs, _Action5);

		function _Orgs(actionData) {
			_classCallCheck(this, _Orgs);

			_get(Object.getPrototypeOf(_Orgs.prototype), 'constructor', this).call(this, 'orgs', actionData);
		}

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

	var Actions = {
		Realms: _Realms,
		Users: _Users,
		Credentials: _Credentials,
		SignupTokens: _SignupTokens,
		Orgs: _Orgs,
		Memberships: _Memberships,
		AuthProviders: _AuthProviders,
		ConnectedApps: _ConnectedApps,
		Hooks: _Hooks,
		Sessions: _Sessions,
		Events: _Events,
		Notifications: _Notifications
	};

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
   * @param {String} loginData.password - Password of new user
   * @return {Promise}
   */

		_createClass(AuthRocket, [{
			key: 'login',
			value: function login(loginData) {
				return request.post(config.urls.js + '/login', loginData).then(function (res) {
					logger$1.log({ description: 'successful login', res: res });
					if (___default.has(res, 'error')) {
						logger$1.error({ description: 'Error signing up.', error: res.error, res: res, func: 'signup', obj: 'AuthRocket' });
						return Promise.reject(res.error);
					}
					return res;
				}, function (error) {
					logger$1.error({ description: 'Error logging in.', error: error });
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
					logger$1.log({ description: 'successful logout', res: res });
					if (___default.has(res, 'error')) {
						logger$1.error({ description: 'Error signing up.', error: res.error, res: res, func: 'signup', obj: 'AuthRocket' });
						return Promise.reject(res.error);
					}
					return res;
				}, function (err) {
					logger$1.error({ description: 'Error logging out.', error: err });
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
						logger$1.error({ description: 'Error signing up.', error: res.error, res: res, func: 'signup', obj: 'AuthRocket' });
						return Promise.reject(res.error);
					}
					logger$1.log({ description: 'Successful signup', res: res, func: 'signup', obj: 'AuthRocket' });
					return res;
				}, function (err) {
					logger$1.error({ description: 'Error signing up.', error: err, func: 'signup', obj: 'AuthRocket' });
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
					logger$1.log({ description: 'token is valid', res: res, func: 'verify', obj: 'AuthRocket' });
					if (___default.has(res, 'error')) {
						logger$1.error({ description: 'Error signing up.', error: res.error, res: res, func: 'signup', obj: 'AuthRocket' });
						return Promise.reject(res.error);
					}
					return res;
				}, function (err) {
					logger$1.error({ description: 'Token is invalid.', error: err, func: 'verify', obj: 'AuthRocket' });
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
