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
	 Sets.find(function(err, results) {
	 	if(err) { console.log(err); }
	 	res.send({sets: results});
	 });
});

router.post('/cardSearch', function(req, res) {
	console.log('req.body ' + req.body.name);
	Sets.find({"cards.name" : req.body.name},{"cards.$": 1}, function(err, results) {
		if(err) { console.log(err); }
		res.send(results);
	});
});

router.put('/addCard', function(req, res) {
	console.log('add Card: ' + req.body.name + ' to Inventory of user: ' + req.body.username);
	
	Inventory.findOne({
		username: req.body.username,
		"cards.name": req.body.name,
		"cards.language": req.body.language,
		"cards.condition": req.body.condition,
		"cards.foil": req.body.foil,
		"cards.signed": req.body.signed,
		"cards.altered": req.body.altered,
		"cards.multiverseid": req.body.multiverseid
	}, function(err, results) {
		console.log(req.body);
		if(err) { console.log("ERROR " + err); }
		console.log('LOLOLOLOLOLOLOLOLOLOLO');
		console.log('LOLOLOLOLOLOLOLOLOLOLO');
		console.log('Results of LOLOLOLOLOLOLOLOLOLOLO');
		console.log(results);
		if(results == null) {
			console.log('IFIFIFIFIFIFFIFIFIF');
			console.log('IFIFIFIFIFIFFIFIFIF');
			Inventory.findOneAndUpdate({username: req.body.username}, {
				$push: { cards: {
					name: req.body.name,
					language: req.body.language,
					condition: req.body.condition,
					foil: req.body.foil,
					signed: req.body.signed,
					altered: req.body.altered,
					multiverseid: req.body.multiverseid,
					amount: req.body.amount
				}}
			}, function(err, results) {
				if (err) { console.log("IF ERROR " + err); }
				console.log('Results of IFIFIFIFIFIFFIFIFIF');
				console.log(results);
			});
			res.send('Card added to Inventory');
		} else {
			console.log('ELSELSELSELSELSELSE');
			console.log('ELSELSELSELSELSELSE');
			Inventory.update({username: req.body.username,
				"username" : req.body.username, 
				"cards" : {
					$elemMatch : {
						"altered": req.body.altered, 
						"condition": req.body.condition, 
						"foil": req.body.foil, 
						"language" : req.body.language, 
						"multiverseid": req.body.multiverseid, 
						"name" : req.body.name, 
						"signed": req.body.signed
					}
				}
			},{ $inc: { "cards.$.amount" : req.body.amount}}, function(err, results) {
				if (err) { console.log("ELSE ERROR " + err); }
				console.log('Results of ELSELSELSELSELSELSE');
				console.log(results);
				res.send('Amount increased by ' + req.body.amount);
			} );
		}
	});
});

router.put('/subtractCard', function(req, res) {
	console.log('subtract Card: ' + req.body.name + ' in Inventory of user: ' + req.body.username);	
	Inventory.update({
		"username" : req.body.username, 
		"cards" : {
			$elemMatch : {
				"altered": req.body.altered, 
				"amount": req.body.amount, 
				"condition": req.body.condition, 
				"foil": req.body.foil, 
				"language" : req.body.language, 
				"multiverseid": req.body.multiverseid, 
				"name" : req.body.name, 
				"signed": req.body.signed
			}
		}
	},{ $inc: { "cards.$.amount" : -1}}, function(err, results) {
		if (err) { console.log(err); }
		console.log(results);
		res.send('Amount decreased');
	});
});

router.post('/delCard', function(req, res) {
	console.log('del Card: ' + req.body.name + ' from Inventory of user: ' + req.body.username);
	Inventory.findOneAndUpdate({username: req.body.username}, {
		$pull: { cards: {
					multiverseid: req.body.multiverseid
				}}
	}, function(err, results) {
		if (err) { console.log(err); }
		console.log(results);
		res.send('Card deleted from Inventory');
	});
});

router.post('/getInventory', function(req, res) {
	console.log('/getInventory of User: ' + req.body.username);
	Inventory.findOne({username: req.body.username}, function(err, results) {
		if(err) { console.log(err); }
		console.log('Results of /getInventory');
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
		format: req.body.format,
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

router.put('/addCardToDeck', function(req, res) {
	console.log('add Card: ' + req.body.name + ' to Deck: ' + req.body.deckname + ' of user: ' + req.body.username);
	
	Deck.findOne({
		username: req.body.username,
		deckname: req.body.deckname,
		"cards.name": req.body.name,
		"cards.language": req.body.language,
		"cards.condition": req.body.condition,
		"cards.foil": req.body.foil,
		"cards.signed": req.body.signed,
		"cards.altered": req.body.altered,
		"cards.multiverseid": req.body.multiverseid
	},{"cards.$": 1}, function(err, results) {
		if(err) { console.log(err); }
		if(results == null) {
			Deck.update({username: req.body.username, deckname: req.body.deckname}, {
				$push: { cards: {
					name: req.body.name,
					language: req.body.language,
					condition: req.body.condition,
					foil: req.body.foil,
					signed: req.body.signed,
					altered: req.body.altered,
					multiverseid: req.body.multiverseid,
					amount: 1
				}}
			}, function(err, results) {
				if (err) { console.log(err); }
				console.log(results);
			});
			res.send('Card added to Deck');
		} else {
			Deck.update({"username" : req.body.username, "cards" : {
				$elemMatch : {
					"altered": req.body.altered, 
					"condition": req.body.condition, 
					"foil": req.body.foil, 
					"language" : req.body.language, 
					"multiverseid": req.body.multiverseid, 
					"name" : req.body.name, 
					"signed": req.body.signed
					}
				}
			}, {$inc: {"cards.$.amount" : 1}}, function(err, results) {
				if (err) { console.log(err); }
				console.log(results);
				res.send('Amount increased');
			} );
		}
		console.log(results);
	});
});

router.post('/subtractCardFromDeck/:id', function(req, res) {
	console.log('SUBTRACT CARD FROM DECK REQUEST BODY');
	console.log('Subtract card: ' + req.body.name + ' from Deck with id: ' + req.params.id);
	var id = req.params.id;
	Deck.update({_id: mongoose.Types.ObjectId(id),
		"cards" : {
			$elemMatch : {
				"multiverseid": req.body.multiverseid
			}
		}
	},{$inc: { "cards.$.amount" : -1}}, function(err, results) {
		if(err) { console.log('ERROR ' + err); }
		console.log(results);
		res.send('Card subtracted from Deck');
	});
});

router.post('/delCardFromDeck/:id', function(req, res) {
	console.log('DELETE CARD FROM DECK REQUEST BODY');
	console.log('Delete card: ' + req.body.name + ' from Deck with id: ' + req.params.id);
	var id = req.params.id;
	Deck.update({_id: mongoose.Types.ObjectId(id)}, {
		$pull : {
			cards: {
				multiverseid: req.body.multiverseid
			}
		}
	}, function(err, results) {
		if(err) { console.log('ERROR ' + err); }
		console.log(results);
		res.send('Card deleted from Deck');
	});
});

module.exports = router;