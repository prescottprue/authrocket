# AuthRocket

[![NPM version][npm-image]][npm-url]
[![NPM downloads][npm-downloads-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Code Climate][climate-image]][climate-url]
[![Code Coverage][coverage-image]][coverage-url]
[![License][license-image]][license-url]
[![Code Style][code-style-image]][code-style-url]

NodeJS library for interfacing with [Auth Rocket](https://authrocket.com/).

## Why Not Use AuthRocket's `authrocket.js`?

[Authrocket.js](https://authrocket.com/docs/js/authrocket_js) requires including jQuery and is therefore not a useful solution for running on NodeJS or within a front end project that doesn't use jQuery. Also, the API for the default AuthRocket library only provides methods for LoginRocket actions as it is for client side usage only.

**Warning**: Not officially supported by Auth Rocket.
## Documentation
Documentation is automatically generated from comments using [gulp-esdoc](https://www.npmjs.com/package/gulp-esdoc). To view a hosted version of the documentation view the docs page.

### [Docs Page](https://cdn.prue.io/authrocket/latest/docs/class/src/authrocket.js~AuthRocket.html)
## Getting Started
1. Install through npm: `npm install --save authrocket`
2. Import AuthRocket:

  **NodeJS**
  ```javascript
  var AuthRocket = require('authrocket');
  ```

  **ES6**
  ```javascript
  import AuthRocket from 'authrocket';
  ```

  **Browser**

  ```html
  <script src="node_modules/authrocket/dist/authrocket.js"></script>
  <!--
  Also available through CDN using:
  <script src="http://cdn.prue.io/authrocket/latest/authrocket.js"></script>
  -->
  ```

3. Create a new AuthRocket instance:
```javascript
//Create new authrocket instance with authrocket.js URL
var authrocket = new AuthRocket({jsUrl: 'https://zzzzzzzzz.e1.loginrocket.com/v1/'});
```

## Configuration
Config variables can be set when you are creating your AuthRocket instance or through environment variables. Using environment variables is suggested for variables that should be kept private, such as your JWT secret.

### LoginRocket capabilities (Login/Logout/Signup)
#### authrocket.js URL
Options Variable: `jsUrl`

Environment Variable: `AUTHROCKET_JS_URL`

### Management Functionality (usually server side)

#### Account ID
Options Variable: `accountId`

Environment Variable: `AUTHROCKET_ACCOUNT_ID`

#### API key
Options Variable: `apiKey`

Environment Variable: `AUTHROCKET_API_KEY`

#### Realm Id
Options Variable: `realmId`

Environment Variable: `AUTHROCKET_REALM_ID`

#### API URL
Options Variable: `apiUrl`

Environment Variable: `AUTHROCKET_API_URL`

### Other vars
#### JWT Secret
Options Variable: `jwtSecret`

Environment Variable: `AUTHROCKET_JWT_SECRET`


[npm-image]: https://img.shields.io/npm/v/authrocket.svg?style=flat-square
[npm-url]: https://npmjs.org/package/authrocket
[npm-downloads-image]: https://img.shields.io/npm/dm/authrocket.svg?style=flat-square
[travis-image]: https://img.shields.io/travis/prescottprue/authrocket/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/prescottprue/authrocket
[daviddm-image]: https://img.shields.io/david/prescottprue/authrocket.svg?style=flat-square
[daviddm-url]: https://david-dm.org/prescottprue/authrocket
[climate-image]: https://img.shields.io/codeclimate/github/prescottprue/authrocket.svg?style=flat-square
[climate-url]: https://codeclimate.com/github/prescottprue/authrocket
[coverage-image]: https://img.shields.io/codeclimate/coverage/github/prescottprue/authrocket.svg?style=flat-square
[coverage-url]: https://codeclimate.com/github/prescottprue/authrocket
[license-image]: https://img.shields.io/npm/l/authrocket.svg?style=flat-square
[license-url]: https://github.com/prescottprue/authrocket/blob/master/LICENSE
[code-style-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[code-style-url]: http://standardjs.com/
