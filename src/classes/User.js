// import fetch from 'isomorphic-fetch';
import config from './config';
import _ from 'lodash';
import request from '../utils/request';
import logger from '../utils/logger';

export default class User {
  constructor(userData) {

  }
  /** Get a specific user
   * @param {Object} userData - Object containing data to signup with
   * @param {String} userData.email - Email of new user
   * @param {String} userData.username - Username of new user
   * @param {String} userData.password - Password of new user
   * @return {Promise}
   */
  get(userData) {
    
  }
  /** Remove a user
   * @param {Object} userData - Object containing data to signup with
   */
  remove(userData) {
  }

}
