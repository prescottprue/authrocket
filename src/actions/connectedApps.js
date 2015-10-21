import config from '../config';
import {has} from 'lodash';
import request from '../utils/request';
import logger from '../utils/logger';

export default class ConnectedAppsAction {
  constructor(settings) {

  }
  /** Get a list of connected apps
   * @return {Promise}
   */
  get() {
    return request.withHeaders('get', `${config.urls.api}/realms`).then((res) => {
      logger.log({description: 'Users list loaded successfully.', res: res, func: 'get', obj: 'RealmsAction'});
      if (has(res, 'error')) {
        logger.error({description: 'Error signing up.', error: res.error, res: res, func: 'get', obj: 'RealmsAction'});
        return Promise.reject(res.error);
      }
      return res.collection ? res.collection : res;
    }, (error) => {
      logger.error({description: 'Error getting users/', error: error});
      return Promise.reject(error);
    });
  }
  /** Add a new connected app
   * @param {Object} appData - Object containing data to create new user with
   * @return {Promise}
   */
  add(appData) {
    return request.post(`${config.urls.api}/users`, appData).then((res) => {
      logger.log({description: 'Successful created new user', res: res});
      if (has(res, 'error')) {
        logger.error({description: 'Error creating new user.', error: res.error, res: res, func: 'add', obj: 'RealmsAction'});
        return Promise.reject(res.error);
      }
      return res;
    }, (err) => {
      logger.error({description: 'Error creating new user.', error: err, func: 'add', obj: 'RealmsAction'});
      return Promise.reject(err);
    });
  }
}
