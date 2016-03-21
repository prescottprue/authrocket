import config from '../config'
import { has, isString } from 'lodash'
import request from '../utils/request'
import logger from '../utils/logger'

export default class Action {
  constructor (actionName, actionData, endpoint) {
    this.name = actionName
    this.endpoint = endpoint ? endpoint : `${this.name}`
    this.init(actionData)
  }

  init (actionData) {
    logger.log({ description: 'Init action called.', actionData, func: 'url', obj: 'Action' })
    this.isList = !!actionData
    if (!this.isList) {
      this.actionData = actionData
      if (isString(actionData)) { // String username provided
        this.id = this.actionData
      } else if (has(actionData, 'id') || has(actionData, 'username')) { // Check for object to have id or username
        this.id = actionData.id ? actionData.id : actionData.username
      } else {
        logger.warn({ description: 'Invalid action data object.', func: 'constructor', obj: 'Action' })
        this.isList = false
      }
    }
  }

  get url () {
    let url = this.isList ? `${config.urls.api}/${this.endpoint}` : `${config.urls.api}/${this.endpoint}/${this.id}`
    logger.log({ description: 'Url created.', url: url, func: 'url', obj: 'Action' })
    return url
  }

  /** Get
   * @return {Promise}
   */
  get () {
    return request.get(this.url).then(res => res.error ? Promise.reject(res.error) : res)
  }

  add (newData) {
    return request.post(this.url, newData).then(res => res.error ? Promise.reject(res.error) : res)
  }

  update (updateData) {
    return request.put(this.url, updateData).then(res => res.error ? Promise.reject(res.error) : res)
  }

  remove () {
    return request.del(this.url).then(res => res.error ? Promise.reject(res.error) : res)
  }
}
