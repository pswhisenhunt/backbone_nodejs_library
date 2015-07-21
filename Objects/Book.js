var db = require('monk')('localhost/library');
var library = db.get('library');


var Books = {
  create: function(data, callback) {
    library.findOne({ibsn: data.ibsn}, function(err, doc) {
      if (doc) {
        callback(null);
      } else {
        library.insert(data, function(err, doc) {
          if (err) {
            throw err
          }
          callback(doc);
        });
      }
    });
  },

  all: function(callback) {
    var books = [];
    library.find({}, function(err, docs) {
      if (err) {
        throw err;
      }
      else {
        docs.forEach(function(doc) {
          books.push(doc);
        });
      }
      callback(books);
    });
  },

  edit: function(data, callback) {
    library.update({_id: data._id}, data, function(err, doc) {
      if (err) {
        throw err;
      }
      callback(doc);
    });
  },

  delete: function(id, callback) {
    var success = false;
    library.remove({_id: id}, function(err) {
      if (err) {
        throw err;
      }
      else {
        success = true;
        callback(success);
      }
    });
  }
};

module.exports = Books;
