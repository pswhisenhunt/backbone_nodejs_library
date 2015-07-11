var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var BookView = require('./BookView');

var BookListView = Backbone.View.extend({
    el: '.book-list',


    initialize: function() {
      this.collection.on('reset', this.render, this);
      this.collection.on('add', this.addBook, this);
      this.collection.fetch({reset: true});
    },

    render: function() {
      this.collection.each(function(book) {
        var bookView = new BookView({model: book });
        this.$el.append(bookView.render().el);
      }, this)
      return this;
    },

    addBook: function(book) {
      var bookView = new BookView({model: book});
      this.$el.append(bookView.render().el);
    }
});

module.exports = BookListView;
