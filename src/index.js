// import fetch from 'isomorphic-fetch'
import config from './config'
import { has, isString } from 'lodash'
import request from './utils/request'
import * as Actions from './actions'

export default class AuthRocket {
  constructor (settings) {
    if (settings && isString(settings)) {
      this.apiUrl = settings
    } else {
      // Set api url if within settings
      config.applySettings(settings)
    }
  }

  login (loginData) {
    if (!has(loginData, 'username') || !has(loginData, 'password')) {
      return Promise.reject('Username/Email and password are required.')
    }
    return request.post(`${config.urls.js}/login`, loginData, false)
      .then((res) =>
        (res.error || res.errno)
        ? Promise.reject(res.errno ? 'User not found.' : res.error)
        : res
      )
      .catch(err =>
        Promise.reject(err === 'ENOTFOUND' ? 'User not found.' : err)
      )
  }

  logout (token) {
    if (!token || !isString(token)) {
      return Promise.reject('Valid token is required to logout.')
    }
    return request.post(`${config.urls.js}/logout`, { token }, false)
      .then(res => (res.error || res.errno)
        ? Promise.reject(res.error || res.errno)
        : res
      )
      .catch(err => Promise.reject(err))
  }

  signup (signupData) {
    const { username, email, password } = signupData
    if ((!username && !email) || !password) {
      return Promise.reject('Username/Email and password are required.')
    }
    return request.post(`${config.urls.js}/signup`, signupData)
      .then((res) => (res.error || res.errno)
        ? Promise.reject(res.error || res.errno)
        : res
      )
      .catch((err) => Promise.reject(err))
  }

  verify (token) {
    return request.get(`${config.urls.api}/sessions/${token}`)
      .then((res) => Promise.reject(res.error) || res)
      .catch((err) => Promise.reject(err))
  }

  Realms (actionData) {
    return new Actions.Realms(actionData)
  }

  Users (actionData) {
    return new Actions.Users(actionData)
  }

  Credentials (actionData) {
    return new Actions.Credentials(actionData)
  }

  SignupTokens (actionData) {
    return new Actions.SignupTokens(actionData)
  }

  Orgs (actionData) {
    return new Actions.Orgs(actionData)
  }

  Memberships (actionData) {
    return new Actions.Memberships(actionData)
  }

  AuthProviders (actionData) {
    return new Actions.AuthProviders(actionData)
  }

  ConnectedApps (actionData) {
    return new Actions.ConnectedApps(actionData)
  }

  Hooks (actionData) {
    return new Actions.Hooks(actionData)
  }

  Sessions (actionData) {
    return new Actions.Sessions(actionData)
  }

  Events (actionData) {
    return new Actions.Events(actionData)
  }

  Notifications (actionData) {
    return new Actions.Notifications(actionData)
  }
}
