var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var AddBookView = require('./AddBookView');

var AppView = Backbone.View.extend({
  el: '#library',

  events: {
    'click .show-add-book-form': 'addBookForm',
    'keydown .filter-by-author': 'handleFilterByAuthor',
    'click .reset-filter': 'handleResetFilter'
  },

  initialize: function() {
    this.showAddBtn = $('.show-add-book-form');
  },

  addBookForm: function() {
    this.showAddBtn.addClass('no-show');
    var addbookview = new AddBookView({collection: this.collection});
    this.$el.find('.add-book-view-container').append(addbookview.render().el);
  },

  handleFilterByAuthor: function(event) {
    if (event.which === 13) {
      var searchVal = event.currentTarget.value;
      var searchAttr = 'author';
      this.collection.setSearchQuery(searchAttr, searchVal);
    }
  },

  handleResetFilter: function() {
    this.collection.setSearchQuery('', '');
  }
});


module.exports = AppView;
