var http = require('http');
var url = require('url');
var router = require('../routes/router');

var server = http.createServer(function(req, res) {
  if (req.url === '/favicon.ico') {
    res.writeHead(200, {'Content-Type': 'image/x-icon'});
    res.end()
    return;
  }

  var path = url.parse(req.url).pathname;
  var currentRoute = router.match(path);
  if (!currentRoute) {
    res.end('404');
  } else {
    currentRoute.fn(req, res, currentRoute);
  }
});

server.listen(8080, function(err){
  if (err) {
    console.log(err)
    throw err
  }
  console.log('Server running on port 8080...');
})
