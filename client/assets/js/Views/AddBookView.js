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
    'click .add-form-btn': 'handleClickSave',
    'click .cancel-form-btn': 'handleCancel'
  },

  initialize: function() {
    this.$el.removeClass('no-show');
    this.$error = $('#library').find('.error');
    this.showAddBtn = $('#library').find('.show-add-book-form');
    this.model = new Book();
  },

  render: function() {
    this.$el.html(this.template());
    return this;
  },

  handleKeyupCover: function(event) {
    this.model.set('cover', event.target.value)
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
    var ibsn = this.model.attributes.ibsn;
    if (!ibsn || ibsn === 0) {
      this.$error[0].innerHTML = 'You must have an IBSN to add a book.'
      this.$error.removeClass('no-show');
    } else {
      this.$error[0].innerHTML = '';
      this.$error.addClass('no-show');
      this.model.save(null, {
        success: function() {
          self.collection.add(self.model);
          self.showAddBtn.removeClass('no-show');
          self.$error[0].innerHTML = '';
          self.$error.addClass('no-show');
          self.remove();
        },
        error: function() {
          self.$error[0].innerHTML = 'A book with that IBSN already exist in the library';
          self.$error.removeClass('no-show');
        }
      });
    }
  },

  handleCancel: function(event) {
    event.preventDefault();
    this.showAddBtn.removeClass('no-show');
    this.$error[0].innerHTML = '';
    this.$error.addClass('no-show');
    this.remove();
  }
});

module.exports = AddBookView;
