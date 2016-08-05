var mongoose = require('mongoose');
var Names = require('server/db/db').Names;
var Sets = require('server/db/db').Sets;
var Inventory = require('server/db/db').Inventory;
var Deck = require('server/db/db').Deck;
var express = require('express');
var router = express.Router();


router.get('/getNamesArray', function(req, res) {
	console.log('start getting names');
	Names.find(function(err, results) {
		if(err) {console.log(err); }
		console.log('send names');
		res.send(results);
	})
});

router.get('/sets', function(req, res) {
// var sets = new Sets({name: 'Sets Set', code: 'TS1'});
//  	sets.save(function(err) {
//    if (err) { consol.log(err); }
//    res.send('Sets saved');
//  });
	 Sets.find(function(err, results) {
	 	if(err) { console.log(err); }
	 	res.send({sets: results});
	 });
});

router.put('/lolsets', function(req, res) {
	 var sets = new Sets(req.body);
	 sets.save(function(err) {
	 	if(err) { console.log(err); }
	 	res.send("Done!");
	 });
});

router.post('/cardSearch', function(req, res) {
	console.log('req.body ' + req.body.name);
	Sets.find({"cards.name" : req.body.name},{"cards.$": 1}, function(err, results) {
		if(err) { console.log(err); }
		res.send({cards: results});
	});
});

router.post('/getInventory', function(req, res) {
	console.log(req.body.username);
	Inventory.findOne({username: req.body.username}, function(err, results) {
		if(err) { console.log(err); }
		console.log(results);
		res.send(results);
	});
});

router.put('/addDeck/backup', function(req, res) {
	console.log('get ' + req.body.username + ' add ' + req.body.deckname + ' to decks');
	Inventory.update({username: req.body.username}, {
		$push: { decks: { 
			name: req.body.deckname,
			cards: [] 
	}}}, function(err, results) {
		if(err) { console.log(err, results); }
		console.log(results);
		res.send('Deck added');
	});
});

router.put('/addDeck', function(req, res) {
	console.log('get ' + req.body.username + ' add ' + req.body.deckname + ' to decks');
	var deck = new Deck({
		username: req.body.username,
		deckname: req.body.deckname,
		cards: [] 
	});
	deck.save(function(err, results) {
		if(err) { console.log(err, results); }
		console.log(results);
		res.send('Deck added');
	});
});

router.post('/getDecks', function(req, res) {
	console.log(req.body.username);
	Deck.find({username: req.body.username}, function(err, results) {
		if(err) { console.log(err); }
		console.log(results);
		res.send(results);
	});
});

router.delete('/delDeck/:id', function(req, res) {
	var id = req.params.id;
	console.log('delete Deck: ' + id);
	Deck.remove({_id: mongoose.Types.ObjectId(id)}, function(err) {
		if(err) { console.log(err); }
		res.send('Deck deleted');
	});
});

module.exports = router;