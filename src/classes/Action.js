import config from '../config'
import { has, isString } from 'lodash'
import request from '../utils/request'

export default class Action {
  constructor (actionName, actionData, endpoint) {
    this.name = actionName
    this.endpoint = endpoint || this.name
    this.init(actionData)
  }

  init (actionData) {
    this.isList = !!actionData
    if (!this.isList) {
      this.actionData = actionData
      if (isString(actionData)) { // String username provided
        return this.id = this.actionData
      }
      if (has(actionData, 'id') || has(actionData, 'username')) { // Check for object to have id or username
        return this.id = actionData.id ? actionData.id : actionData.username
      }
      this.isList = false
    }
  }

  get url () {
    return this.isList ? `${config.urls.api}/${this.endpoint}` : `${config.urls.api}/${this.endpoint}/${this.id}`
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
