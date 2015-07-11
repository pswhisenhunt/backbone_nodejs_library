var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');

var Book = Backbone.Model.extend({
  idAttribute: '_id',
  defaults: {
    title: 'No title',
    ibsn: 0,
    publisher: 'No Publisher',
    year: 0,
    author: 'No Author',
    cover: ''
  },
  urlRoot: '/books'
});

module.exports = Book;
