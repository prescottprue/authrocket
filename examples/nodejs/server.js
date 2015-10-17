var port = process.env.PORT || 3000,
  http = require('http');
var AuthRocket = require('../../dist/authrocket');
authrocket = new AuthRocket();
var server = http.createServer(function (req, res) {
  console.log('request:', req);
  //Handle Message from SQS Queue
  if (req.method === 'POST') {
    var body = '';

    req.on('data', function(chunk) {
        body += chunk;
    });

    req.on('end', function() {
      switch(req.url) {
        case '/login':
          console.log('login called with ', req.body, body);
          authrocket.login(req.body).then(function(loginRes){
            console.log('login successful:', loginRes);
          }, function(err){
            console.error('Error logging in:', err);
          });
          break;
        default:
        //Otherwise respond 200 (Health Checks)
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
