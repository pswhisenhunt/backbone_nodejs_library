var Book = require('../Models/Book');
var Backbone = require('backbone');

var BookList = Backbone.Collection.extend({
  initialize: function() {
    this.searchValue = '';
    this.searchAttribure = '';
    this.sortModelAttributes = '_id';
  },
  model: Book,
  url: '/books',
  getModels: function() {
    var models = [];
    if (this.searchValue === '') {
      return this.models
    } else {
      for (var i = 0; i < this.models.length; i++) {
        if(this.models[i].get(this.searchAttribure).toLowerCase() === this.searchValue.toLowerCase()) {
          models.push(this.models[i]);
        }
      }
    }
    return models;
  },
  setSearchQuery: function(attr, val) {
    this.searchAttribure = attr;
    this.searchValue = val;
    this.trigger('change');
  },

  setSortQuery: function(sortAttr) {
    this.sortModelAttributes = sortAttr;
    this.sort();
  },

  comparator: function(modelA, modelB) {
    if (modelA.get(this.sortModelAttributes).toLowerCase() > modelB.get(this.sortModelAttributes).toLowerCase()) {
      return 1;
    }
    else if (modelA.get(this.sortModelAttributes).toLowerCase() < modelB.get(this.sortModelAttributes).toLowerCase()) {
      return -1;
    }
    else {
      return 0;
    }
  }
});

module.exports = BookList;
