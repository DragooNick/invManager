var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var todosConnection = mongoose.createConnection('mongodb://localhost/todos');
var invManConnection = mongoose.createConnection('mongodb://localhost/test');
var userConnection = mongoose.createConnection('mongodb://localhost/users');

var Todo = todosConnection.model('Todo', new mongoose.Schema({
  task: String,
  isCompleted: Boolean,
  isEditing: Boolean
}));

var Test = invManConnection.model('Test', new mongoose.Schema({
	name: String,
	code: String
}));

var User = userConnection.model('User', new mongoose.Schema({
	username: String,
	password: String,
	email: String,
	firstname: String,
	lastname: String
}));

module.exports.Todo = Todo;
module.exports.Test = Test;
module.exports.User = User;