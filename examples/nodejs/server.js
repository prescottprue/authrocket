var port = process.env.PORT || 3000,
  http = require('http'),
  url = require('url');

var AuthRocket = require('../../dist/authrocket');
authrocket = new AuthRocket();
var server = http.createServer(function (req, res) {
  // console.log('response:', res);
  //Handle Message from SQS Queue
  if (req.method === 'POST') {
    var body = '';

    req.on('data', function(chunk) {
        body += chunk;
    });

    req.on('end', function() {
      switch(req.url) {
        case '/login':
          console.log('login called with ',body, url.parse(body));
          authrocket.login(req.body).then(function(loginRes){
            console.log('login successful:', loginRes);
            res.write('Login successful');
            res.end();
          }, function(errRes){
            console.error('Error logging in:', errRes.error);
            res.writeHead('400');
            res.write('Error logging in');
            res.end();
          });
          break;
        case '/signup':
          console.log('signup called with ', body, url.parse(body).query);
          authrocket.signup(req.body).then(function(loginRes){
            console.log('signup successful:', loginRes);
            res.write('Signup successful');
            res.end();
          }, function(errRes){
            // console.error('Error signing up:', errRes);
            console.error('Error signing up:', errRes.error);
            res.writeHead('400');
            res.write(errRes.message);
            res.end();
          });
          break;
        default:
        //Otherwise respond 200 (Health Checks)
        console.log('404 being called');
        res.writeHead(404,'NOT_FOUND', {'Content-Type': 'text/plain'});
        res.end();
      }
    });
  } else {
    //Otherwise respond 200 (Health Checks)
    res.writeHead(200,'OK', {'Content-Type': 'text/plain'});
    res.end();
  }
});

// Listen on port 3000, IP defaults to 127.0.0.1
server.listen(port);

// Put a friendly message on the terminal
console.log('Server running at http://127.0.0.1:' + port + '/');
