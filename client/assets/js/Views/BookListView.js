var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var BookView = require('./BookView');


var BookListView = Backbone.View.extend({
    el: '.book-list',

    initialize: function() {
      this.collection.on('reset change', this.render, this);
      this.collection.on('add', this.addBook, this);
      this.collection.on('sort', this.render, this);
      this.collection.fetch({reset: true});
    },

    render: function() {
      this.$el.empty();
      var models = this.collection.getModels();
      if(models.length === 0) {
        this.$el.append('No search results');
      } else {
        for (var i = 0; i < models.length; i++) {
          var bookView = new BookView({model: models[i] });
          this.$el.append(bookView.render().el);
        }
      }
      return this;
    },

    addBook: function(book) {
      var bookView = new BookView({model: book});
      this.$el.append(bookView.render().el);
    }
});

module.exports = BookListView;
