# AuthRocket
NodeJS library for interfacing with [Auth Rocket](https://authrocket.com/).

## Why Not Use AuthRocket's `authrocket.js`?

[Authrocket.js](https://authrocket.com/docs/js/authrocket_js) requires including jQuery and is therefore not a useful solution for running on NodeJS or within a front end project that doesn't use jQuery. Also, the API for the default AuthRocket library only provides methods for LoginRocket actions as it is for client side usage only.

**Warning**: Not officially supported by Auth Rocket.
## Getting Started
1. Install through npm: `npm install --save authrocket`
2. Import AuthRocket:

  **Browser**
  ```html
  <script src="node_modules/authrocket/dist/authrocket.js"></script>
  <!--
  Also available through CDN using:
  <script src="http://cdn.prue.io/authrocket/latest/authrocket.js"></script>
  -->
  ```

  **NodeJS**
  ```javascript
  var AuthRocket = require('authrocket');
  ```

  **ES6**
  ```javascript
  import AuthRocket from 'authrocket';
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
