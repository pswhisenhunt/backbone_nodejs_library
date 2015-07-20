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
        library.findOne({ibsn: book.ibsn}, function(err, doc) {
          if (doc) {
            res.end();
          } else {
            library.insert(book, function(err, doc) {
              if (err) {
                throw err
              }
              res.end(JSON.stringify(doc));
            });
          }
        });
      });
    };
  },

  book: function(req, res, url) {
    if (req.method === 'PUT') {
      var data = '';

      req.on('data', function(chunk) {
        data += chunk;
      });

      req.on('end', function() {
        var book = JSON.parse(data);
        console.log(book);
        library.update({_id: book._id}, book, function(err, doc) {
          if (err) {
            throw err;
          }
          res.end(JSON.stringify(doc));
        });
      });
    }
    if (req.method === 'DELETE') {
      library.remove({_id: url.params.id}, function(err) {
        if (err) {
          throw err;
        }
        res.end();
      })
    }
  }
}
