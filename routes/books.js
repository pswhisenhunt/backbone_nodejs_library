var view = require('./views');
var Books = require('../Objects/Book');

var HEADERS_ACCEPT_JSON = 'application/json';

module.exports = {
  index: function(req, res, url) {
    if (req.method === 'GET') {
      var isAskingForJSON = req.headers.accept.indexOf(HEADERS_ACCEPT_JSON) !== -1;
      if (isAskingForJSON) {
        Books.all(function(books){
          res.write(JSON.stringify(books));
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
        Books.create(book, function(newBook) {
          if (newBook) {
            res.end(JSON.stringify(newBook));
          }
          else {
            res.end();
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
        Books.edit(book, function(updatedBook) {
          res.end(JSON.stringify(updatedBook));
        });
      });
    }
    if (req.method === 'DELETE') {
      var id = url.params.id;
      Books.delete(id, function(success) {
        if (success) {
          res.end();
        }
        else {
          res.end();
        }
      });
    }
  }
}
