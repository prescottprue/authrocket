// import fetch from 'isomorphic-fetch';
import config from './config';
import _ from 'lodash';
import request from './utils/request';
import logger from './utils/logger';
import UsersAction from './actions/users';

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
   * @param {String} loginData.password - Password of new user
   * @return {Promise}
   */
  login(loginData) {
    return request.post(`${config.urls.js}/login`, loginData).then((res) => {
      logger.log({description: 'successful login', res: res});
      if (_.has(res, 'error')) {
        logger.error({description: 'Error signing up.', error: res.error, res: res, func: 'signup', obj: 'AuthRocket'});
        return Promise.reject(res.error);
      }
      return res;
    }, (error) => {
      logger.error({description: 'Error logging in.', error: error});
      return Promise.reject(error);
    });
  }
  /** Logout a user
   * @param {Object} token - Object containing data to signup with
   * @return {Promise}
   */
  logout(token) {
    console.log('config:', config.urls.js);
    return request.post(`${config.urls.js}/logout`, {token: token}).then((res) => {
      logger.log({description: 'successful logout', res: res});
      if (_.has(res, 'error')) {
        logger.error({description: 'Error signing up.', error: res.error, res: res, func: 'signup', obj: 'AuthRocket'});
        return Promise.reject(res.error);
      }
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
   */
  signup(signupData) {
    return request.post(`${config.urls.js}/signup`, signupData).then((res) => {
      if (_.has(res, 'error')) {
        logger.error({description: 'Error signing up.', error: res.error, res: res, func: 'signup', obj: 'AuthRocket'});
        return Promise.reject(res.error);
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
   * @return {Promise}
   */
  verify(token) {
    return request.post(`${config.urls.js}/sessions/${token}`).then((res) => {
      logger.log({description: 'token is valid', res: res, func: 'verify', obj: 'AuthRocket'});
      if (_.has(res, 'error')) {
        logger.error({description: 'Error signing up.', error: res.error, res: res, func: 'signup', obj: 'AuthRocket'});
        return Promise.reject(res.error);
      }
      return res;
    }, (err) => {
      logger.error({description: 'Token is invalid.', error: err, func: 'verify', obj: 'AuthRocket'});
      return Promise.reject(err);
    });
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
    return new UsersAction(actionData);
  }
}
