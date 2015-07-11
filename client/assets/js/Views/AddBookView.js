var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var BookView = require('./BookView');
var BookListView = require('./BookListView');
var Book = require('../Models/Book');

var AddBookView = Backbone.View.extend({
  className: 'add-book-view',

  template: _.template($('#add-book-form').html()),

  events: {
    'keyup .title': 'handleKeyupTitle',
    'keyup .author': 'handleKeyupAuthor',
    'keyup .publisher': 'handleKeyupPublisher',
    'keyup .year': 'handleKeyupYear',
    'keyup .ibsn': 'handleKeyupIBSN',
    'keyup .cover': 'handleKeyupCover',
    'click .add-book-form-btn': 'handleClickSave'
  },

  initialize: function() {
    this.$el.removeClass('no-show');
    this.model = new Book();
  },

  render: function() {
    this.$el.html(this.template());
    return this;
  },

  handleKeyupCover: function(event) {
    this.model.set('title', event.target.value)
  },

  handleKeyupTitle: function(event) {
    this.model.set('title', event.target.value)
  },

  handleKeyupAuthor: function(event) {
    this.model.set('author', event.target.value)
  },

  handleKeyupPublisher: function(event) {
    this.model.set('publisher', event.target.value)
  },

  handleKeyupYear: function(event) {
    this.model.set('year', event.target.value)
  },

  handleKeyupIBSN: function(event) {
    this.model.set('ibsn', event.target.value)
  },

  handleClickSave: function(event) {
    var self = this;
    event.preventDefault();
    this.model.save(null, {
      success: function() {
        console.log('success');
        self.collection.add(self.model);
        self.remove();
      }
    });

    // this.$el.addClass('no-show');
  }
});

module.exports = AddBookView;
