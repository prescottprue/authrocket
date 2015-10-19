import {has, merge, keys, each, isString} from 'lodash';

let defaultConfig = {
	accountId: process.env.AUTHROCKET_ACCOUNT_ID,
	apiKey: process.env.AUTHROCKET_API_KEY,
	realmId: process.env.AUTHROCKET_REALM_ID,
	jwtSecret: process.env.AUTHROCKET_JWT_SECRET,
  apiUrl: process.env.AUTHROCKET_API_URL  || 'https://api-e1.authrocket.com/v1/',
  jsLibUrl: process.env.AUTHROCKET_JSLIB_URL
};
let configInstance = null; //Singleton variable
class Config {
	constructor() {
		if (!configInstance) {
      configInstance = this;
    }
		// console.log({description: 'Config object created.', config: merge(this, defaultConfig), func: 'constructor', obj: 'Config'});
		return merge(configInstance, defaultConfig);
	}
  applySettings(settingsData) {
    each(keys(settingsData), (key) => {
      this[key] = settingsData[key];
    });
  }
  //Map getters that handle removing trailing slash of urls
  get urls() {
    let jsUrl = this.jsLibUrl;
    return {
      get api() {
        return this.apiUrl ? removeTrailingSlash(this.apiUrl) : null;
      },
      get js() {
        return jsUrl ? removeTrailingSlash(jsUrl) : null;
      }
    };
  }
}
let config = new Config();

export default config;

function removeTrailingSlash(url) {
  if (!isString(url)) {
    logger.error({description: 'Slash can only be removed from strings.', func: 'removeTrailingSlash', file: 'config'});
    return url;
  }
  return url.replace(/\/$/, '');
}
