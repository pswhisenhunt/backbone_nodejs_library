var routes = require('routes')();
var fs = require('fs');
var mime = require('mime-types');
var view = require('./views');

module.exports = {
  root: function(req, res, url) {
    if (req.method === 'GET') {
      res.setHeader('Content-Type', 'text/html');
      var template = view.render('home', {});
      res.end(template);
    }
  },
  public : function(req, res, url) {
    fs.readFile('.' + req.url, function(err, file) {
      if (err) {
        throw err
      }
      res.setHeader('Content-Type', mime.lookup(req.url));
      res.end(file);
    })
  }
}
