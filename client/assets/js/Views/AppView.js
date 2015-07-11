var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var AddBookView = require('./AddBookView');

var AppView = Backbone.View.extend({
  el: '#library',

  events: {
    'click .show-add-book-form': 'addBookForm'
  },

  addBookForm: function() {
    var addbookview = new AddBookView({collection: this.collection});
    this.$el.find('.add-book-view-container').append(addbookview.render().el);
  }
});


module.exports = AppView;
