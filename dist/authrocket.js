var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('request')) : typeof define === 'function' && define.amd ? define(['request'], factory) : global.AuthRocket = factory(global.request);
})(this, function (request) {
	'use strict';

	request = 'default' in request ? request['default'] : request;

	var env = process.env.NODE_ENV;
	var config;
	switch (env) {
		case 'local':
			config = require('./env/local');
			break;
		// case 'development':
		// 	config = require('./env/development');
		// 	break;
		// case 'staging':
		// 	config = require('./env/staging');
		// 	break;
		case 'production':
			config = require('./env/production');
			break;
		default:
			config = require('./env/production');
			break;
	}

	var AuthRocket = (function () {
		function AuthRocket(settings) {
			_classCallCheck(this, AuthRocket);
		}

		_createClass(AuthRocket, [{
			key: 'login',
			value: function login() {
				request(config.urls.api, function (error, response, body) {
					if (!error && response.statusCode == 200) {
						console.log(body); // Print the page
					}
				});
			}
		}]);

		return AuthRocket;
	})();

	return AuthRocket;
});
//# sourceMappingURL=authrocket.js.map
