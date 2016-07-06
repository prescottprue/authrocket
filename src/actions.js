import Action from './classes/Action'

export class Realms extends Action {
  constructor (actionData) {
    super('realms', actionData)
  }
  /** Get realms
   * @return {Promise}
   * @example
   * //list realms
   * authrocket.Realms().get().then(function(realmsList){
   *    console.log('List of realms', realmsList)
   * })
   */
 /** Get a specific realm
  * @param {String} token - String JWT token of logged in user
  * @return {Promise}
  * @example
  * //Realms based on token
  * var realmId = 'rl_0v1zTHXhtNgmDaXaDYSAqx'
  * authrocket.Realms(realmId).then(function(realm){
  *    console.log('Realm data:', realm)
  * })
  */
  /** Add a realm
   * @param {String} token - String JWT token of logged in user
   * @return {Promise}
   * @example
   * var realmData = {name: 'Test Realm'}
   * authrocket.Realms().add(realmData).then(function(){
   *    console.log('Logged out successfully.')
   * })
   */
  /** Update a realm
   * @param {String} token - String JWT token of logged in user
   * @return {Promise}
   * @example
   * authrocket.Realms().update().then(function(){
   *    console.log('Logged out successfully.')
   * })
   */
 /** Remove a realm
  * @param {String} id - Realm Id
  * @return {Promise}
  * @example
  * var realmId = 'rl_0v1zTHXhtNgmDaXaDYSAqx'
  * authrocket.Realms(realmId).remove().then(function(){
  *    console.log('Realm removed successfully.')
  * })
  */
}
export class Users extends Action {
  constructor (actionData) {
    super('users', actionData)
  }
  /** Get realms
   * @return {Promise}
   * @example
   * //list realms
   * authrocket.Users().get().then(function(realmsList){
   *    console.log('List of realms', realmsList)
   * })
   */
   /** Get a specific realm
    * @param {String} token - String JWT token of logged in user
    * @return {Promise}
    * @example
    * //Users based on token
    * var realmId = 'rl_0v1zTHXhtNgmDaXaDYSAqx'
    * authrocket.Users(realmId).then(function(realm){
    *    console.log('Realm data:', realm)
    * })
    */
    /** Add a realm
     * @param {String} token - String JWT token of logged in user
     * @return {Promise}
     * @example
     * var realmData = {name: 'Test Realm'}
     * authrocket.Users().add(realmData).then(function(){
     *    console.log('Logged out successfully.')
     * })
     */
    /** Update a realm
     * @param {String} token - String JWT token of logged in user
     * @return {Promise}
     * @example
     * authrocket.Users().update().then(function(){
     *    console.log('Logged out successfully.')
     * })
     */
     /** Remove a realm
      * @param {String} id - Realm Id
      * @return {Promise}
      * @example
      * var realmId = 'rl_0v1zTHXhtNgmDaXaDYSAqx'
      * authrocket.Users(realmId).remove().then(function(){
      *    console.log('Realm removed successfully.')
      * })
      */
}
export class Credentials extends Action {
  constructor (actionData) {
    super('credentials', actionData)
  }
  /** Get Users
   * @return {Promise}
   * @example
   * authrocket.Users().get().then(function(UsersList){
   *    console.log('List of Users', UsersList)
   * })
   */
   /** Get a specific realm
    * @param {String} token - String JWT token of logged in user
    * @return {Promise}
    * @example
    * //Realms based on token
    * var userId = 'rl_0v1zTHXhtNgmDaXaDYSAqx'
    * authrocket.Users(userId).then(function(user){
    *    console.log('Realm data:', user)
    * })
    */
    /** Add a user
     * @param {String} token - String JWT token of logged in user
     * @return {Promise}
     * @example
     * var userData = {name: 'Test Realm'}
     * authrocket.Users().add(userData).then(function(){
     *    console.log('Logged out successfully.')
     * })
     */
    /** Update a user
     * @param {String} token - String JWT token of logged in user
     * @return {Promise}
     * @example
     * authrocket.Users().update().then(function(){
     *    console.log('Logged out successfully.')
     * })
     */
     /** Remove a Realm
      * @param {String} id - Realm Id
      * @return {Promise}
      * @example
      * var username = 'rl_0v1zTHXhtNgmDaXaDYSAqx'
      * authrocket.Users(username).remove().then(function(){
      *    console.log('Realm removed successfully.')
      * })
      */
}
export class SignupTokens extends Action {
  constructor (actionData) {
    super('signup_tokens', actionData)
  }
  /** Get SignupTokens
   * @return {Promise}
   * @example
   * authrocket.SignupTokens().get().then(function(usersList){
   *    console.log('List of realms', realmsList)
   * })
   */
  /** Get a specific Signup Token
   * @return {Promise}
   * @example
   * //SignupTokens based on token
   * var signupTokenId = 'rl_0v1zTHXhtNgmDaXaDYSAqx'
   * authrocket.SignupTokens(signupTokenId).then(function(signupToken){
   *    console.log('Realm data:', signupToken)
   * })
   */
  /** Add a Signup Token
   * @param {Object}  - Signup Token data
   * @return {Promise}
   * @example
   * var signupTokenData = {name: 'Test Realm'}
   * authrocket.SignupTokens().add(signupTokenData).then(function(){
   *    console.log('Logged out successfully.')
   * })
   */
  /** Update a signupToken
   * @return {Promise}
   * @example
   * authrocket.SignupTokens().update().then(function(){
   *    console.log('Logged out successfully.')
   * })
   */
  /** Remove a signupToken
   * @param {String} id - Realm Id
   * @return {Promise}
   * @example
   * var signupToken = 'rl_0v1zTHXhtNgmDaXaDYSAqx'
   * authrocket.SignupTokens(signupToken).remove().then(function(){
   *    console.log('Realm removed successfully.')
   * })
   */
}
export class Orgs extends Action {
  constructor (actionData) {
    super('orgs', actionData)
  }
  /** Get Orgs
   * @return {Promise}
   * @example
   * //list Orgs
   * authrocket.Realms().get().then(function(OrgsList){
   *    console.log('List of Orgs', OrgsList)
   * })
   */
  /** Get a specific org
   * @param {String} name - Name or id of organization
   * @return {Promise}
   * @example
   * var orgId = 'rl_0v1zTHXhtNgmDaXaDYSAqx'
   * authrocket.Realms(orgId).then(function(org){
   *    console.log('Realm data:', org)
   * })
   */
  /** Add a org
   * @param {Object} orgData - Data associated with organization
   * @param {String} name - Name of org
   * @return {Promise}
   * @example
   * var orgData = {name: 'Admins'}
   * authrocket.Realms().add(orgData).then(function(){
   *    console.log('Logged out successfully.')
   * })
   */
  /** Update a org
   * @return {Promise}
   * @example
   * authrocket.Realms().update().then(function(){
   *    console.log('Logged out successfully.')
   * })
   */
  /** Remove a org
   * @param {String} id - Org Id
   * @return {Promise}
   * @example
   * var orgId = 'rl_0v1zTHXhtNgmDaXaDYSAqx'
   * authrocket.Realms(orgId).remove().then(function(){
   *    console.log('Realm removed successfully.')
   * })
   */
}
export class Memberships extends Action {
  constructor (actionData) {
    super('memberships', actionData)
  }
}
export class AuthProviders extends Action {
  constructor (actionData) {
    super('auth_providers', actionData)
  }
}
export class ConnectedApps extends Action {
  constructor (actionData) {
    super('login_policies', actionData)
  }
}
export class Hooks extends Action {
  constructor (actionData) {
    super('app_hooks', actionData)
  }
}
export class Sessions extends Action {
  constructor (actionData) {
    super('session', actionData)
  }
}

export class Events extends Action {
  constructor (actionData) {
    super('events', actionData)
  }
}
export class Notifications extends Action {
  constructor (actionData) {
    super('notifications', actionData)
  }
}

export default { Realms, Users, Credentials, SignupTokens, Orgs, Memberships, AuthProviders, ConnectedApps, Hooks, Sessions, Events, Notifications }
