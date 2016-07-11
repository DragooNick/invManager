var todosRoutes = require('server/todos/routes');
var invManRoutes = require('server/invMan/routes');

module.exports = function routes(app) {
  app.use('/todos', todosRoutes);
  app.use('/invMan/stuff', invManRoutes);
};