var routes = require('routes')();
var fs = require('fs');
var db = require('monk')('localhost/books');
var qs = require('qs');
var mime = require('mime-types');
var view = require('./views');
var library = db.get('books');

module.exports = {
  index: function(req, res, url) {
    if (req.method === 'GET') {
      library.find({}, function(err, docs) {
        var template = view.render('books/index', {books: docs});
        res.end(template);
      });
    }

    if (req.method === 'POST') {
      var data = '';

      req.on('data', function(chunk) {
        data += chunk
      });

      req.on('end', function() {
        var book = qs.parse(data);
        library.insert(book, function(err, doc) {
          if (err) {
            throw err
          }
          res.writeHead(302, {'Location': '/books'});
          res.end();
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
    if (req.method === 'POST') {
      library.remove({_id: url.params.id}, function(err, doc) {
        if (err) {
          throw err
        }
        res.writeHead(302, {'Location': '/books'});
        res.end();
      });
    }
  }
}
