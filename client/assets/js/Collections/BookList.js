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
        var modelsValueAtSearchAttribute = this.models[i].get(this.searchAttribure).toLowerCase();
        if (this.searchValue.indexOf(' ') > -1) {
          var valSubStrAt = this.searchValue.indexOf(' ');
        }
        if (modelsValueAtSearchAttribute.indexOf(' ') > -1) {
          var modelsSubStrAt = modelsValueAtSearchAttribute.indexOf(' ');
        }

        if (valSubStrAt && modelsSubStrAt) {
          if (modelsValueAtSearchAttribute.substring(0, modelsSubStrAt) === this.searchValue.substring(0, valSubStrAt)) {
            models.push(this.models[i]);
          }
        }
        else if (!valSubStrAt && modelsSubStrAt) {
          if (this.searchValue === modelsValueAtSearchAttribute.substring(0, modelsSubStrAt)) {
            models.push(this.models[i]);
          }
        }
        else {
          if (this.serachValue === modelsValueAtSearchAttribute) {
            models.push(this.models[i]);
          }
        }
      }
      return models;
    }
  },
  setSearchQuery: function(attr, val) {
    this.searchAttribure = attr;
    this.searchValue = val.toLowerCase();
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
