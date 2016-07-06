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

  /** Login as a user
   * @param {Object} loginData - Object containing data to signup with
   * @param {String} loginData.email - Email of new user
   * @param {String} loginData.username - Username of new user
   * @param {String} loginData.password - Password of new user
   * @return {Promise}
   * @example
   * //login as a user
   * var userData = {username: 'testuser1', password: 'secretstring'}
   * authrocket.login(userData).then(function(newUser){
   *    console.log('Successful signup:', newUser)
   * })
   */
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
  /** Logout a user
   * @param {String} token - String JWT token of logged in user
   * @return {Promise}
   * @example
   * //logout based on token
   * var token = 'b89787f98728rcn8279.898er89qb8bsf.98basdfasd'
   * authrocket.logout(token).then(function(){
   *    console.log('Logged out successfully.')
   * })
   */
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
  /** Signup a new user
   * @param {Object} signupData - Object containing data to signup with
   * @param {String} signupData.email - Email of new user
   * @param {String} signupData.password - Password of new user
   * @param {String} signupData.confirm - Object containing data to signup with
   * @return {Promise}
   * @example
   * //signup
   * var userData = {username: 'testuser1', email: 'test@test.com', password: 'secretstring'}
   * authrocket.signup(userData).then(function(newUser){
   *    console.log('Successful signup:', newUser)
   * })
   */
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
  /** Verify an existing token is valid
   * @param {String} token - JSON Web Token to verify
   * @param {String} expand - Values to expand (memberships and/or token)
   * @return {Promise}
   * @example
   * //verify token and return membership and token data
   * var token = 'b89787f98728rcn8279.898er89qb8bsf.98basdfasd'
   * authrocket.verify(token , 'memberships,token').then(function(response){
   *    console.log('token is valid. User data:', response)
   * })
   */
  verify (token) {
    return request.get(`${config.urls.api}/sessions/${token}`)
      .then((res) => Promise.reject(res.error) || res)
      .catch((err) => Promise.reject(err))
  }
  /** Realms action namespace
   *
   */
  Realms (actionData) {
    return new Actions.Realms(actionData)
  }
  /** Users action namespace
   * @example
   * //Get users list
   * authrocket.Users().get().then(function(loadedUser){
   *  console.log('User found:', loadedUser)
   * })
   * //Get user by username
   * authrocket.User('someguy1').get().then(function(loadedUser){
   *  console.log('User found:', loadedUser)
   * })
   */
  Users (actionData) {
    return new Actions.Users(actionData)
  }
  /** Credentials action namespace
   *
   */
  Credentials (actionData) {
    return new Actions.Credentials(actionData)
  }
  /** SignupTokens action namespace
   *
   */
  SignupTokens (actionData) {
    return new Actions.SignupTokens(actionData)
  }
  /** Orgs action namespace
   *
   */
  Orgs (actionData) {
    return new Actions.Orgs(actionData)
  }
  /** Memberships action namespace
   *
   */
  Memberships (actionData) {
    return new Actions.Memberships(actionData)
  }
  /** AuthProviders action namespace
   *
   */
  AuthProviders (actionData) {
    return new Actions.AuthProviders(actionData)
  }
  /** ConnectedApps action namespace
   *
   */
  ConnectedApps (actionData) {
    return new Actions.ConnectedApps(actionData)
  }
  /** Hooks action namespace
   *
   */
  Hooks (actionData) {
    return new Actions.Hooks(actionData)
  }
  /** Sessions action namespace
   *
   */
  Sessions (actionData) {
    return new Actions.Sessions(actionData)
  }
  /** Events action namespace
   *
   */
  Events (actionData) {
    return new Actions.Events(actionData)
  }
  /** Notifications action namespace
   *
   */
  Notifications (actionData) {
    return new Actions.Notifications(actionData)
  }
}
