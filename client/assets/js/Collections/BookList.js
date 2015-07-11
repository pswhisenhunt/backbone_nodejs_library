var Book = require('../Models/Book');
var Backbone = require('backbone');

var BookList = Backbone.Collection.extend({
  model: Book,
  url: '/books'
});

module.exports = BookList;
