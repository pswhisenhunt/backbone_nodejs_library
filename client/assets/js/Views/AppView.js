var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var AddBookView = require('./AddBookView');

var AppView = Backbone.View.extend({
  el: '#library',

  events: {
    'click .show-add-book-form': 'addBookForm',
    'keydown .filter-by-author': 'handleFilterByAuthor',
    'keydown .filter-by-publisher': 'handleFilterByPublisher',
    'keydown .filter-by-title': 'handleFilterByTitle',
    'click .reset-filter': 'handleResetFilter',
    'click .sort-by-year': 'handleSortByYear',
    'click .sort-by-author' : 'handleSortByAuthor',
    'click .sort-by-title': 'handleSortByTitle'
  },

  initialize: function() {
    this.showAddBtn = $('.show-add-book-form');
    this.sortByYear = $('.sort-by-year');
    this.sortByAuthor = $('.sort-by-author');
    this.sortByTitle = $('.sort-by-title');
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

  handleFilterByPublisher: function(event) {
    if (event.which === 13) {
      var searchVal = event.currentTarget.value;
      var searchAttr = 'publisher';
      this.collection.setSearchQuery(searchAttr, searchVal);
    }
  },

  handleFilterByTitle: function(event) {
    if (event.which === 13) {
      var searchVal = event.currentTarget.value;
      var searchAttr = 'title';
      this.collection.setSearchQuery(searchAttr, searchVal);
    }
  },

  handleResetFilter: function() {
    this.collection.setSearchQuery('', '');
  },

  handleSortByYear: function() {
    this.sortByYear.addClass('selected');
    this.sortByAuthor.removeClass('selected');
    this.sortByTitle.removeClass('selected');
    this.collection.setSortQuery('year');
  },

  handleSortByAuthor: function() {
    this.sortByYear.removeClass('selected');
    this.sortByAuthor.addClass('selected');
    this.sortByTitle.removeClass('selected');
    this.collection.setSortQuery('author');
  },

  handleSortByTitle: function() {
    this.sortByYear.removeClass('selected');
    this.sortByAuthor.removeClass('selected');
    this.sortByTitle.addClass('selected');
    this.collection.setSortQuery('title');
  }
});


module.exports = AppView;
