import config from '../config';
import {has, isString} from 'lodash';
import request from '../utils/request';
import logger from '../utils/logger';

export default class UsersAction {
  constructor(settings) {

  }
  /** Get a list of users or specific user
   * @param {String | Object} userData - Information identifing user for which to load specific data
   * @return {Promise}
   */
  get(userData) {
    let url = `${config.urls.api}/users`;
    if (userData) {
      let userId;
      if (!isString(userData)) {
        if (!has(userData, 'username')) { //Check for object to have username
          logger.error({description: 'Invalid userdata object. Username is required.', func: 'get', obj: 'UsersAction'});
          return Promise.reject('Invalid userData');
        }
        url += `/${userData.username}`;
      } else { //Userdata is a string id
        url += `/${userData}`;
      }
    }
    return request.withHeaders('get', url).then((res) => {
      logger.log({description: 'User(s) loaded successfully.', res: res, func: 'get', obj: 'UsersAction'});
      if (_.has(res, 'error')) {
        logger.error({description: 'Error signing up.', error: res.error, res: res, func: 'get', obj: 'UsersAction'});
        return Promise.reject(res.error);
      }
      return res.collection ? res.collection : res;
    }, (error) => {
      logger.error({description: 'Error getting user(s).', inputData: userData, error: error, func: 'get', obj: 'UsersAction'});
      return Promise.reject(error);
    });
  }
  /** Add a new user
   * @param {Object} userData - Object containing data to create new user with
   * @param {String} userData.email - New user's email
   * @param {Object} userData.username - New user's username
   * @param {Object} userData.password - New user's password
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
  /** Remove a user
   * @param {Object} userData - Object containing data to signup with
   * @param {String} userData.email - Email of new user
   * @param {String} userData.password - Password of new user
   * @param {String} userData.confirm - Object containing data to signup with
   * @return {Promise}
   */
  remove(userData) {
    if (!has(userData, 'username')) {
      logger.error({description: 'Error removing user.', error: res.error, res: res, func: 'remove', obj: 'UsersAction'});
      return new Promise.reject('Username is required to remove user.');
    }
    return request.del(`${config.urls.api}/users/${userData.username}`, userData).then((res) => {
      if (has(res, 'error')) {
        logger.error({description: 'Error removing user.', error: res.error, res: res, func: 'remove', obj: 'UsersAction'});
        return Promise.reject(res.error);
      }
      logger.log({description: 'User removed successfully.', res: res, func: 'remove', obj: 'UsersAction'});
      return res;
    }, (err) => {
      logger.error({description: 'Error removing user.', error: err, func: 'remove', obj: 'UsersAction'});
      return Promise.reject(err);
    });
  }
}
