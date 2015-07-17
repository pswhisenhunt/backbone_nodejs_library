var routes = require('routes')();
var home = require('./home');
var books = require('./books');

routes.addRoute('/', home.root);
routes.addRoute('/public/*', home.public);
routes.addRoute('/books', books.index);
routes.addRoute('/books/:id', books.book);


module.exports = routes;
