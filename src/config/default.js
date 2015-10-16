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

export default config;
