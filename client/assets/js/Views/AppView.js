var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var AddBookView = require('./AddBookView');

var AppView = Backbone.View.extend({
  el: '#library',

  events: {
    'click .show-add-book-form': 'addBookForm'
  },

  initialize: function() {
    this.showAddBtn = $('.show-add-book-form');
  },

  addBookForm: function() {
    this.showAddBtn.addClass('no-show');
    var addbookview = new AddBookView({collection: this.collection});
    this.$el.find('.add-book-view-container').append(addbookview.render().el);
  }
});


module.exports = AppView;
