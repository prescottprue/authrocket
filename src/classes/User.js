// import fetch from 'isomorphic-fetch';
import config from './config';
import _ from 'lodash';
import request from '../utils/request';
import logger from '../utils/logger';

export default class AuthRocket {
  constructor(settings) {
    if (settings && _.isString(settings)) {
      this.apiUrl = settings;
    } else {
      //Set api url if within settings
      config.applySettings(settings);
    }
  }
  /** Get a specific user
   * @param {Object} userData - Object containing data to signup with
   * @param {String} userData.email - Email of new user
   * @param {String} userData.username - Username of new user
   * @param {String} userData.password - Password of new user
   * @return {Promise}
   */
  get(userData) {
    //TODO: Handle userData not having username
    return request.get(`${config.urls.api}/users/${userData.username}`, loginData).then((res) => {
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
  /** Remove a user
   * @param {Object} userData - Object containing data to signup with
   * @param {String} userData.email - Email of new user
   * @param {String} userData.password - Password of new user
   * @param {String} userData.confirm - Object containing data to signup with
   * @return {Promise}
   */
  remove(userData) {
    //TODO: Handle userData not having username
    return request.del(`${config.urls.api}/users/${userData.username}`, userData).then((res) => {
      if (_.has(res, 'error')) {
        logger.error({description: 'Error removing user.', error: res.error, res: res, func: 'signup', obj: 'AuthRocket'});
        return Promise.reject(res.error);
      }
      logger.log({description: 'User removed successfully.', res: res, func: 'signup', obj: 'AuthRocket'});
      return res;
    }, (err) => {
      logger.error({description: 'Error removing user.', error: err, func: 'signup', obj: 'AuthRocket'});
      return Promise.reject(err);
    });
  }

}
