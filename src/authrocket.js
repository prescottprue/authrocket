// import fetch from 'isomorphic-fetch';
import config from './config';
import _ from 'lodash';
import request from './utils/request';
import logger from './utils/logger';
import * as Actions from './actions';
console.log('actions:', Actions);
export default class AuthRocket {
  constructor(settings) {
    if (settings && _.isString(settings)) {
      this.apiUrl = settings;
    } else {
      //Set api url if within settings
      config.applySettings(settings);
    }
  }
  /** Login as a user
   * @param {Object} loginData - Object containing data to signup with
   * @param {String} loginData.email - Email of new user
   * @param {String} loginData.username - Username of new user
   * @param {String} loginData.password - Password of new user
   * @return {Promise}
   * @example
   * //login as a user
   * var userData = {username: 'testuser1', password: 'secretstring'};
   * authrocket.login(userData).then(function(newUser){
   *    console.log('Successful signup:', newUser);
   * });
   */
  login(loginData) {
    if ((!_.has(loginData, 'username') && !_.has(loginData, 'email')) || !_.has(loginData, 'username')) {
      logger.error({description: 'Username/Email and password are required to login.', func: 'login', obj: 'AuthRocket'});
      return Promise.reject('Username/Email and password are required.');
    }
    return request.post(`${config.urls.js}/login`, loginData).then((res) => {
      logger.log({description: 'successful login', res: res});
      if (_.has(res, 'error')) {
        logger.error({description: 'Error logging in.', error: res.error, res: res, func: 'login', obj: 'AuthRocket'});
        return Promise.reject(res.error);
      }
      if (_.has(res, 'errno')) {
        let error = res.errno;
        let description = 'Error signing up.';
        if (error === 'ENOTFOUND') {
            error = 'User not found.';
            description = error;
        }
        logger.error({description: error, error: res.errno, res: res, func: 'login', obj: 'AuthRocket'});
        return Promise.reject(error);
      }
      return res;
    }, (error) => {
      logger.error({description: 'Error logging in.', error: error});
      return Promise.reject(error);
    });
  }
  /** Logout a user
   * @param {String} token - String JWT token of logged in user
   * @return {Promise}
   * @example
   * //logout based on token
   * var token = 'b89787f98728rcn8279.898er89qb8bsf.98basdfasd';
   * authrocket.logout(token).then(function(){
   *    console.log('Logged out successfully.');
   * });
   */
  logout(token) {
    if (!token || !_.isString(token)) {
      logger.error({description: 'Token string is required to logout.', func: 'logout', obj: 'AuthRocket'});
      return Promise.reject('Valid token is required to logout.');
    }
    return request.post(`${config.urls.js}/logout`, {token: token}).then((res) => {
      if (_.has(res, 'error') || _.has(res, 'errno')) {
        logger.error({description: 'Error logging out.', error: res.error || res.errno, res: res, func: 'logout', obj: 'AuthRocket'});
        return Promise.reject(res.error || res.errno);
      }
      logger.log({description: 'Successful logout.', res: res, func: 'logout', obj: 'AuthRocket'});
      return res;
    }, (err) => {
      logger.error({description: 'Error logging out.', error: err});
      return Promise.reject(err);
    });
  }
  /** Signup a new user
   * @param {Object} signupData - Object containing data to signup with
   * @param {String} signupData.email - Email of new user
   * @param {String} signupData.password - Password of new user
   * @param {String} signupData.confirm - Object containing data to signup with
   * @return {Promise}
   * @example
   * //signup
   * var userData = {username: 'testuser1', email: 'test@test.com', password: 'secretstring'};
   * authrocket.signup(userData).then(function(newUser){
   *    console.log('Successful signup:', newUser);
   * });
   */
  signup(signupData) {
    if ((!_.has(signupData, 'username') && !_.has(signupData, 'email')) || !_.has(signupData, 'username')) {
      logger.error({description: 'Username/Email and password are required to login.', func: 'login', obj: 'AuthRocket'});
      return Promise.reject('Username/Email and password are required.');
    }
    return request.post(`${config.urls.js}/signup`, signupData).then((res) => {
      if (_.has(res, 'error') || _.has(res, 'errno')) {
        logger.error({description: 'Error signing up.', error: res.error || res.errno, res: res, func: 'signup', obj: 'AuthRocket'});
        return Promise.reject(res.error || res.errno);
      }
      logger.log({description: 'Successful signup', res: res, func: 'signup', obj: 'AuthRocket'});
      return res;
    }, (err) => {
      logger.error({description: 'Error signing up.', error: err, func: 'signup', obj: 'AuthRocket'});
      return Promise.reject(err);
    });
  }
  /** Verify an existing token is valid
   * @param {String} token - JSON Web Token to verify
   * @param {String} expand - Values to expand (memberships and/or token)
   * @return {Promise}
   * @example
   * //verify token and return membership and token data
   * var token = 'b89787f98728rcn8279.898er89qb8bsf.98basdfasd';
   * authrocket.verify(token , 'memberships,token').then(function(response){
   *    console.log('token is valid. User data:', response);
   * });
   */
  verify(token) {
    return request.get(`${config.urls.js}/sessions/${token}`).then((res) => {
      logger.log({description: 'Token/Session is valid.', res: res, func: 'verify', obj: 'AuthRocket'});
      if (_.has(res, 'error')) {
        logger.error({description: 'Error verifying token/session.', error: res.error, res: res, func: 'verify', obj: 'AuthRocket'});
        return Promise.reject(res.error);
      }
      return res;
    }, (err) => {
      logger.error({description: 'Token/Session is invalid.', error: err, func: 'verify', obj: 'AuthRocket'});
      return Promise.reject(err);
    });
  }
  /** Realms action namespace
   *
   */
  Realms(actionData) {
    return new Actions.Realms(actionData);
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
  Users(actionData) {
    return new Actions.Users(actionData);
  }
  /** Credentials action namespace
   *
   */
  Credentials(actionData) {
    return new Actions.Credentials(actionData);
  }
  /** SignupTokens action namespace
   *
   */
  SignupTokens(actionData) {
    return new Actions.SignupTokens(actionData);
  }
  /** Orgs action namespace
   *
   */
  Orgs(actionData) {
    return new Actions.Orgs(actionData);
  }
  /** Memberships action namespace
   *
   */
  Memberships(actionData) {
    return new Actions.Memberships(actionData);
  }
  /** AuthProviders action namespace
   *
   */
  AuthProviders(actionData) {
    return new Actions.AuthProviders(actionData);
  }
  /** ConnectedApps action namespace
   *
   */
  ConnectedApps(actionData) {
    return new Actions.ConnectedApps(actionData);
  }
  /** Hooks action namespace
   *
   */
  Hooks(actionData) {
    return new Actions.Hooks(actionData);
  }
  /** Sessions action namespace
   *
   */
  Sessions(actionData) {
    return new Actions.Sessions(actionData);
  }
  /** Events action namespace
   *
   */
  Events(actionData) {
    return new Actions.Events(actionData);
  }
  /** Notifications action namespace
   *
   */
  Notifications(actionData) {
    return new Actions.Notifications(actionData);
  }
}
