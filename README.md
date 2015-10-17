# AuthRocket
NodeJS library for interfacing with [Auth Rocket](https://authrocket.com/).

## Why Not Use AuthRocket's `authrocket.js`?

[Authrocket.js](https://authrocket.com/docs/js/authrocket_js) requires including jQuery and is therefore not a useful solution for running on NodeJS or within a front end project that doesn't use jQuery. Also, the API for the default AuthRocket library uses terms that does not match endpoints.

**Warning**: Not officially supported by Auth Rocket. This library was created as an organizational aid.

## Environment Variables
* AUTHROCKET_ACCOUNT_ID
* AUTHROCKET_API_KEY
* AUTHROCKET_REALM_ID
* AUTHROCKET_JWT_SECRET
* AUTHROCKET_API_URL
* AUTHROCKET_LOGIN_URL
* AUTHROCKET_SIGNUP_URL
* AUTHROCKET_JSLIB_URL
