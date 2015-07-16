var routes = require('routes')();
var fs = require('fs');
var db = require('monk')('localhost/library');
var qs = require('qs');
var mime = require('mime-types');
var view = require('./views');
var library = db.get('library');

var HEADERS_ACCEPT_JSON = 'application/json';

module.exports = {
  index: function(req, res, url) {
    if (req.method === 'GET') {
      var isAskingForJSON = req.headers.accept.indexOf(HEADERS_ACCEPT_JSON) !== -1;
      if (isAskingForJSON) {
        library.find({}, function(err, docs) {
            res.write(JSON.stringify(docs))
            res.end();
        });
      } else {
        var template = view.render('books/index', {});
        res.write(template.toString())
        res.end();
      }
    }

    if (req.method === 'POST') {
      var data = '';

      req.on('data', function(chunk) {
        data += chunk
      });

      req.on('end', function() {
        var book = JSON.parse(data);
        library.insert(book, function(err, doc) {
          if (err) {
            throw err
          }
          res.end(JSON.stringify(doc));
        });
      })
    }
  },

  new: function(req, res, url) {
    if (req.method === 'GET') {
      var template = view.render('books/new', {});
      res.end(template);
    };
  },

  edit: function(req, res, url) {
    if (req.method === 'GET') {
      library.findOne({_id: url.params.id}, function(err, doc) {
        var template = view.render('books/edit', doc);
        res.end(template);
      });
    }
  },

  update: function(req, res, url) {
    if (req.method === 'POST') {
      var data = '';

      req.on('data', function(chunk) {
        data += chunk;
      });

      req.on('end', function() {
        var book = qs.parse(data);
        library.update({_id: url.params.id}, function(err, doc) {
          var template = view.render('books/show', doc);
          res.end(template);
        });
      });
    }
  },

  show: function(req, res, url) {
    if (req.method === 'GET') {
      library.findOne({_id: url.params.id}, function(err, doc) {
        var template = view.render('books/show', doc);
        res.end(template);
      });
    }
  },

  delete: function(req, res, url) {
    if (req.method === 'DELETE') {
      library.remove({_id: url.params.id}, function(err, doc) {
        if (err) {
          throw err
        }
        res.writeHead(200);
        res.end();
      });
    }
  }
}
