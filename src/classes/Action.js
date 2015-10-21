import config from '../config';
import {has, isString} from 'lodash';
import request from '../utils/request';
import logger from '../utils/logger';

export default class Action {
  constructor(actionName, actionData, endpoint) {
    this.name = actionName;
    this.endpoint = endpoint ? endpoint : `${this.name}`;
    this.init(actionData);
  }
  init(actionData) {
    logger.log({description: 'Init action called.', actionData: actionData, func: 'url', obj: 'Action'});
    this.isList = actionData ? false : true;
    if (!this.isList) {
      this.actionData = actionData;
      if (isString(actionData)) { //String username provided
        this.id = this.actionData;
      } else if (has(actionData, 'id') || has(actionData, 'username')) { //Check for object to have id or username
        this.id = actionData.id ? actionData.id : actionData.username;
      } else {
        logger.warn({description: 'Invalid action data object.', func: 'constructor', obj: 'Action'});
        this.isList = false;
        // return Promise.reject('Invalid this.actionData');
      }
    }
  }
  get url() {
    let url = this.isList ? `${config.urls.api}/${this.endpoint}` : `${config.urls.api}/${this.endpoint}/${this.id}`;
    logger.log({description: 'Url created.', url: url, func: 'url', obj: 'Action'});
    return url;
  }
  /** Get
   * @return {Promise}
   */
  get() {
    return request.get(this.url).then((res) => {
      logger.log({description: 'Get responded successfully.', res: res, func: 'get', obj: 'Action'});
      if (has(res, 'error')) {
        logger.error({description: 'Error in get response.', error: res.error, res: res, func: 'get', obj: 'Action'});
        return Promise.reject(res.error);
      }
      return res.collection ? res.collection : res;
    }, (error) => {
      logger.error({description: 'Error in GET request.', error: error, func: 'get', obj: 'Action'});
      return Promise.reject(error);
    });
  }
  /** Add a new user
   * @param {Object} newData - Object containing data to create with
   * @return {Promise}
   */
  add(newData) {
    return request.post(this.url, newData).then((res) => {
      logger.log({description: 'Add request responded successfully.', res: res, func: 'add', obj: 'Action'});
      if (has(res, 'error')) {
        logger.error({description: 'Error creating new user.', error: res.error, res: res, func: 'add', obj: 'Action'});
        return Promise.reject(res.error);
      }
      logger.log({description: 'Add successful.', res: res, func: 'add', obj: 'Action'});
      return res;
    }, (err) => {
      logger.error({description: 'Error creating new user.', error: err, func: 'add', obj: 'Action'});
      return Promise.reject(err);
    });
  }
  update(updateData) {
    return request.put(this.url, updateData).then((res) => {
      if (has(res, 'error')) {
        logger.error({description: 'Error in update request.', error: res.error, res: res, func: 'update', obj: 'Action'});
        return Promise.reject(res.error);
      }
      logger.log({description: 'Update successful.', res: res, func: 'update', obj: 'Action'});
      return res;
    }, (err) => {
      logger.error({description: 'Error in update request.', error: err, func: 'update', obj: 'Action'});
      return Promise.reject(err);
    });
  }
  /** Remove
   * @return {Promise}
   */
  remove() {
    return request.del(this.url).then((res) => {
      if (has(res, 'error')) {
        logger.error({description: 'Error in request for removal.', error: res.error, res: res, func: 'remove', obj: 'Action'});
        return Promise.reject(res.error);
      }
      logger.log({description: 'Remove successfully.', res: res, func: 'remove', obj: 'Action'});
      return res;
    }, (err) => {
      logger.error({description: 'Error in request for removal.', error: err, func: 'remove', obj: 'Action'});
      return Promise.reject(err);
    });
  }
}
