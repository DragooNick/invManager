var loginRoutes = require('server/login/routes');
var todosRoutes = require('server/todos/routes');
var invManRoutes = require('server/invMan/routes');

module.exports = function routes(app, passport) {
  app.use('/todos', todosRoutes);
  app.use('/invMan', invManRoutes);
  app.use('/login/stuff', loginRoutes);
};