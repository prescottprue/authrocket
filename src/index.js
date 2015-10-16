var request = require('request');
var config = require('./config/default');

exports.login = function() {
  request(config.urls.api, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body) // Print the page
     }
  })
}
