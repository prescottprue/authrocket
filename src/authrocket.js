// import fetch from 'isomorphic-fetch';
import config from './config';
import _ from 'lodash';

export default class AuthRocket {
  constructor(settings) {
    if (settings && _.isString(settings)) {
      this.apiUrl = settings;
    } else {
      //Set api url if within settings
      this.apiUrl = _.has(settings, 'apiUrl') ? settings.apiUrl : config.urls.api;
      this.apiKey = _.has(settings, 'apiKey') ? settings.apiKey : config.apiKey;
      this.accountId = _.has(settings, 'accountId') ? settings.accountId : config.accountId;
      this.realmId = _.has(settings, 'realmId') ? settings.realmId : config.realmId;
      this.jsApiUrl = _.has(settings, 'jsApiUrl') ? settings.urls.jslib : config.urls.jslib;
      this.signupUrl = _.has(settings, 'signupUrl') ? settings.urls.signup : config.urls.signup || config.urls.api;
    }
  }
  /** Login as a user
   * @param {Object} loginData - Object containing data to signup with
   * @param {String} loginData.email - Email of new user
   * @param {String} loginData.password - Password of new user
   * @return {Promise}
   */
  login(loginData) {
    return this.requestWithHeaders('login', loginData).then((res) => {
      console.log('successful login', res);
      //TODO: Handle error response
      return res;
    }, (error) => {
      console.error('Error logging in.', error);
      return Promise.reject(error);
    });
  }
  /** Logout a user
   * @param {Object} token - Object containing data to signup with
   * @return {Promise}
   */
  logout(token) {
    return this.requestWithHeaders('logout', {token: token}).then((res) => {
      console.log('successful logout', res);
      //TODO: Handle error response
      return res;
    }, (error) => {
      console.error('Error logging out.', error);
      return Promise.reject(error);
    });
  }
  /** Signup a new user
   * @param {Object} signupData - Object containing data to signup with
   * @param {String} signupData.email - Email of new user
   * @param {String} signupData.password - Password of new user
   * @param {String} signupData.confirm - Object containing data to signup with
   * @return {Promise}
   */
  signup(signupData) {
    return this.requestWithHeaders(`${this.jsApiUrl}signup`, signupData).then((res) => {
      console.log('successful signup', res);
      //TODO: Handle error response
      return res;
    }, (error) => {
      console.error('Error signing up.', error);
      return Promise.reject(error);
    });
  }
  /** Verify an existing token is valid
   * @param {String} token - JSON Web Token to verify
   * @return {Promise}
   */
  verify(token) {
    return this.requestWithHeaders(`sessions/${token}`).then((res) => {
      console.log('token is valid', res);
      return res;
    }, (err) => {
      console.error('Token is invalid.', err);
      return Promise.reject(err);
    });
  }
  /** Attach AuthRocket request headers and make a request
   * @param {String} endpoint - Endpoint to send request to
   * @param {Object|String} data - Request data
   * @return {Promise}
   */
   requestWithHeaders(url, data) {

   }

  // requestWithHeaders(url, data) {
  //   // if (!_.has(this, ['accountId', 'apiKey', 'realmId'])) {
  //   //   console.error('Account, apiKey, and realm are required to make a request with headers.', JSON.stringify(this));
  //   //   return Promise.reject({message: 'Account, apiKey, and realm are required to make a request with headers.'});
  //   // }
  //   let options = {
  //     method: 'post', //TODO: Handle other request methods
  //     headers: {
  //     //   'X-Authrocket-Account': this.accountId,
  //     //   'X-Authrocket-Api-Key': this.apiKey,
  //     //   'X-Authrocket-Realm': this.realmId,
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //     //   'User-agent': 'https://github.com/prescottprue/authrocket'
  //     }
  //   };
  //   //Add data to request if it exists
  //   if (data) {
  //     options.body = data;
  //   }
  //   console.log('requesting with options:',url, options);
  //   return fetch(url, options).then((res) => {
  //     if (res.status >= 200 && res.status < 300) {
  //       if (res.error) {
  //         return Promise.reject(res.error);
  //       }
  //       console.log('response with text:', res.json());
  //       return res.json();
  //     } else {
  //       console.log('error response:', res);
  //       var error = new Error(res.statusText);
  //       error.response = res;
  //       return Promise.reject(res.statusText);
  //     }
  //   }).then((text) => {
  //     console.log('Text response:', text);
  //     return text;
  //   });
  // }
}
