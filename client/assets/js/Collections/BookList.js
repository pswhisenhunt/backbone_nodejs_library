var Book = require('../Models/Book');
var Backbone = require('backbone');

var BookList = Backbone.Collection.extend({
  initialize: function() {
    this.searchQuery = '';
  },
  model: Book,
  url: '/books',
  getModels: function() {
    var models = [];
    if (this.searchQuery === '') {
      return this.models
    } else {
      for (var i = 0; i < this.models.length; i++) {
        if(this.models[i].get('author') === this.searchQuery) {
          models.push()
        }
      }
    }
    return models;
    // loop over models to see what searchQuery matches and return those models
  },
  setSearchQuery: function(searchQuery) {
    this.searchQuery = searchQuery;
    this.trigger('change');
  }
});

module.exports = BookList;
