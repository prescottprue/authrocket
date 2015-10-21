import config from './config';
import {has, isString} from 'lodash';
import request from './utils/request';
import logger from './utils/logger';
import Action from './classes/Action';

export default class RealmsAction extends Action {
  constructor(actionData) {
    super('realms', actionData);
  }
}
export default class UsersAction extends Action {
  constructor(actionData) {
    super('users', actionData);
  }
}
export default class CredentialsAction extends Action {
  constructor(actionData) {
    super('credentials', actionData);
  }
}
export default class SignupTokensAction extends Action {
  constructor(actionData) {
    super('signupTokens', actionData);
  }
}
export default class OrgsAction extends Action {
  constructor(actionData) {
    super('orgs', actionData);
  }
}
export default class MembershipsAction extends Action {
  constructor(actionData) {
    super('memberships', actionData);
  }
}
export default class AuthProvidersAction extends Action {
  constructor(actionData) {
    super('auth_providers', actionData);
  }
}
export default class ConnectedAppsAction extends Action {
  constructor(actionData) {
    super('login_policies', actionData);
  }
}
export default class HooksAction extends Action {
  constructor(actionData) {
    super('app_hooks', actionData);
  }
}
export default class SessionsAction extends Action {
  constructor(actionData) {
    super('session', actionData);
  }
}

export default class EventsAction extends Action {
  constructor(actionData) {
    super('events', actionData);
  }
}
export default class NotificationsAction extends Action {
  constructor(actionData) {
    super('notifications', actionData);
  }
}
