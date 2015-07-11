var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');

var BookView = Backbone.View.extend({
  tagName: 'li',

  className: 'book-view',

  template: _.template($('#book-template').html()),

  events: {
    'click .delete': 'delete'
  },

  initialize: function() {
    this.model.on('change', this.render, this);
    this.listenTo(this.model, 'change', this.render);
    this.model.on('destroy', this.remove, this);
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },

  delete: function() {
    this.model.destroy();
  }
});

module.exports = BookView;
