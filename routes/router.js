var routes = require('routes')();
var home = require('./home');
var books = require('./books');

routes.addRoute('/', home.root);
routes.addRoute('/public/*', home.public);
routes.addRoute('/books', books.index);
routes.addRoute('/books/new', books.new);
routes.addRoute('/books/:id/show', books.show);
routes.addRoute('/books/:id/edit', books.edit);
routes.addRoute('/books/:id/update', books.update);
routes.addRoute('/books/:id/delete', books.delete);


module.exports = routes;
