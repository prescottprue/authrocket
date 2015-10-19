// import fetch from 'isomorphic-fetch';
import config from './config';
import _ from 'lodash';
import request from '../utils/request';
import logger from '../utils/logger';

export default class Users {
  constructor(settings) {
    if (settings && _.isString(settings)) {
      this.apiUrl = settings;
    } else {
      //Set api url if within settings
      config.applySettings(settings);
    }
  }
  /** Get a list of users
   * @return {Promise}
   */
  get() {
    return request.get(`${config.urls.api}/users`).then((res) => {
      logger.log({description: 'successful login', res: res});
      if (_.has(res, 'error')) {
        logger.error({description: 'Error signing up.', error: res.error, res: res, func: 'signup', obj: 'Users'});
        return Promise.reject(res.error);
      }
      return res;
    }, (error) => {
      logger.error({description: 'Error logging in.', error: error});
      return Promise.reject(error);
    });
  }
  /** Add a new user
   * @param {Object} userData - Object containing data to create new user with
   * @return {Promise}
   */
  add(userData) {
    return request.post(`${config.urls.api}/users`, userData).then((res) => {
      logger.log({description: 'Successful created new user', res: res});
      if (_.has(res, 'error')) {
        logger.error({description: 'Error creating new user.', error: res.error, res: res, func: 'signup', obj: 'Users'});
        return Promise.reject(res.error);
      }
      return res;
    }, (err) => {
      logger.error({description: 'Error creating new user.', error: err});
      return Promise.reject(err);
    });
  }

}
