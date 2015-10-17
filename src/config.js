import {has, merge} from 'lodash';
let defaultConfig = {
	envName: 'local',
	accountId: process.env.AUTHROCKET_ACCOUNT_ID,
	apiKey: process.env.AUTHROCKET_API_KEY,
	realmId: process.env.AUTHROCKET_REALM_ID,
	jwtSecret: process.env.AUTHROCKET_JWT_SECRET,
	urls: {
		api: process.env.AUTHROCKET_API_URL  || 'https://api-e1.authrocket.com/v1/',
		login: process.env.AUTHROCKET_LOGIN_URL,
		signup: process.env.AUTHROCKET_SIGNUP_URL,
		jslib: process.env.AUTHROCKET_JSLIB_URL
	}
};
let instance = null;
let envName = 'prod';
class Config {
	constructor() {
		if (!instance) {
      instance = this;
    }
		// console.log({description: 'Config object created.', config: merge(this, defaultConfig), func: 'constructor', obj: 'Config'});
		return merge(instance, defaultConfig);
	}
	get logLevel() {
		return defaultConfig.envs[envName].logLevel;
	}
	set envName(newEnv) {
		envName = newEnv;
		// this.envName = newEnv;
		// console.log('Environment name set:', envName);
	}
	get env() {
		return defaultConfig.envs[envName];
	}
}
let config = new Config();

export default config;
