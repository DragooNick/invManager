var mongoose = require('mongoose');
var todosConnection = mongoose.createConnection('mongodb://localhost/todos');
var invManConnection = mongoose.createConnection('mongodb://localhost/test');

var Todo = todosConnection.model('Todo', new mongoose.Schema({
  task: String,
  isCompleted: Boolean,
  isEditing: Boolean
}));

var Test = invManConnection.model('Test', new mongoose.Schema({
	name: String,
	code: String
}));

module.exports.Todo = Todo;
module.exports.Test = Test;