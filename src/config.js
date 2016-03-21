import { merge, keys, each, isString } from 'lodash'

let defaultConfig = {
  accountId: process.env.AUTHROCKET_ACCOUNT_ID,
  apiKey: process.env.AUTHROCKET_API_KEY,
  realmId: process.env.AUTHROCKET_REALM_ID,
  jwtSecret: process.env.AUTHROCKET_JWT_SECRET,
  apiUrl: process.env.AUTHROCKET_API_URL || 'https://api-e1.authrocket.com/v1/',
  jsUrl: process.env.AUTHROCKET_JS_URL
}
let envName = 'prod'
let level = null
let configInstance = null // Singleton variable
class Config {
  constructor () {
    if (!configInstance) {
      configInstance = this
    }
    return merge(configInstance, defaultConfig)
  }

  set logLevel (setLevel) {
    level = setLevel
  }

  get logLevel () {
    if (level) {
      return level
    }
    return defaultConfig.envs[envName].logLevel
  }

  set envName (newEnv) {
    envName = newEnv
    // this.envName = newEnv
    // console.log('Environment name set:', envName)
  }

  get env () {
    return defaultConfig.envs[envName]
  }
  applySettings (settingsData) {
    each(keys(settingsData), key => {
      this[key] = settingsData[key]
    })
  }
  // Map getters that handle removing trailing slash of urls
  get urls () {
    let jsUrl = this.jsUrl
    let apiUrl = this.apiUrl
    return {
      get api () {
        return apiUrl ? removeTrailingSlash(apiUrl) : null
      },
      get js () {
        return jsUrl ? removeTrailingSlash(jsUrl) : null
      }
    }
  }
}
let config = new Config()

export default config

function removeTrailingSlash (url) {
  if (!isString(url)) {
    console.error({
      description: 'Slash can only be removed from strings.',
      func: 'removeTrailingSlash', file: 'config'
    })
    return url
  }
  return url.replace(/\/$/, '')
}
