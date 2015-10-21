import config from './config';
import {has, isString} from 'lodash';
import request from './utils/request';
import logger from './utils/logger';
import Action from './classes/Action';

export class Realms extends Action {
  constructor(actionData) {
    super('realms', actionData);
  }
}
export class Users extends Action {
  constructor(actionData) {
    super('users', actionData);
  }
}
export class Credentials extends Action {
  constructor(actionData) {
    super('credentials', actionData);
  }
}
export class SignupTokens extends Action {
  constructor(actionData) {
    super('signup_tokens', actionData);
  }
}
export class Orgs extends Action {
  constructor(actionData) {
    super('orgs', actionData);
  }
}
export class Memberships extends Action {
  constructor(actionData) {
    super('memberships', actionData);
  }
}
export class AuthProviders extends Action {
  constructor(actionData) {
    super('auth_providers', actionData);
  }
}
export class ConnectedApps extends Action {
  constructor(actionData) {
    super('login_policies', actionData);
  }
}
export class Hooks extends Action {
  constructor(actionData) {
    super('app_hooks', actionData);
  }
}
export class Sessions extends Action {
  constructor(actionData) {
    super('session', actionData);
  }
}

export class Events extends Action {
  constructor(actionData) {
    super('events', actionData);
  }
}
export class Notifications extends Action {
  constructor(actionData) {
    super('notifications', actionData);
  }
}
