var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');

var BookView = Backbone.View.extend({
  className: 'book-view',

  template: _.template($('#book-template').html()),

  events: {
    'click .delete': 'delete',
    'click .edit' : 'handleEditEvent',
    'click .save' : 'handleClickSave',
  },

  initialize: function() {
    this.model.on('change', this.render, this);
    this.listenTo(this.model, 'change', this.render);
    this.model.on('destroy', this.remove, this);
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    this.li = this.$('.book-list-item');
    this.input = this.$('.no-show');
    this.saveBtn = this.$('.save');
    this.author = this.$('.edit-author');
    this.publisher = this.$('.edit-publisher');
    this.year = this.$('.edit-year');
    this.ibsn = this.$('.edit-ibsn');
    this.cover = this.$('.edit-cover');
    return this;
  },

  delete: function() {
    this.model.destroy();
  },

  handleEditEvent: function(event) {
    event.preventDefault();
    this.li.addClass('no-show');
    this.input.removeClass('no-show');
    this.input.addClass('editing');
    this.saveBtn.removeClass('no-show');
  },

  handleClickSave: function(event) {
    this.model.set({
      _id: this.model.id,
      title: this.model.attributes.title,
      publisher: this.publisher.val(),
      author: this.author.val(),
      ibsn: this.ibsn.val(),
      year: this.year.val(),
      cover: this.cover.val()
    });
    console.log(this.model);
    event.preventDefault();
    console.log('inside edit!');
    var self = this;
    this.model.save(null, {
      success: function() {
        console.log('success!');
        self.li.removeClass('no-show');
        self.input.addClass('no-show');
        this.input.removeClass('editing');
        this.saveBtn.addClass('no-show');
      }
    });
  }
});

module.exports = BookView;
