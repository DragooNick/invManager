var mongoose = require('mongoose');
//TODO
//var passportLocalMongoose = require('passport-local-mongoose');
var todosConnection = mongoose.createConnection('mongodb://localhost/todos');
var setsConnection = mongoose.createConnection('mongodb://localhost/sets');
var userConnection = mongoose.createConnection('mongodb://localhost/users');
var inventoryConnection = mongoose.createConnection('mongodb://localhost/inventory');
var decksConnection = mongoose.createConnection('mongodb://localhost/decks');
var namesConnection = mongoose.createConnection('mongodb://localhost/names');

var Todo = todosConnection.model('Todo', new mongoose.Schema({
	task: String,
	isCompleted: Boolean,
	isEditing: Boolean
}));

var Sets = setsConnection.model('Sets', new mongoose.Schema({
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

var Inventory = inventoryConnection.model('Inventory', new mongoose.Schema({
	username: String,
	cards: []
}));

var Deck = decksConnection.model('Deck', new mongoose.Schema({
	username: String,
	deckname: String,
	format: String,
	cards: []
}));

var Names = namesConnection.model('Names', new mongoose.Schema({
	names: []
}));

module.exports.Todo = Todo;
module.exports.Sets = Sets;
module.exports.User = User;
module.exports.Inventory = Inventory;
module.exports.Deck = Deck;
module.exports.Names = Names;