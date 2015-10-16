module.exports = {
	envName: 'production',
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
