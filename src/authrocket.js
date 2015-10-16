import request from 'request';
import config from './config/default';

export default class AuthRocket {
  constructor(settings) {

  }
  login() {
    request(config.urls.api, (error, response, body) => {
      if (!error && response.statusCode == 200) {
          console.log(body); // Print the page
       }
    });
  }
}
