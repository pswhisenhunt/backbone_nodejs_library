var BookList = require('./Collections/BookList');
var BookView = require('./Views/BookView');
var BookListView = require('./Views/BookListView');
var Book = require('./Models/Book');
var AppView = require('./Views/AppView');

var bookList = new BookList();
var bookListView = new BookListView({collection: bookList});
var appView = new AppView({collection: bookList});
