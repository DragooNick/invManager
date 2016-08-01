var mongoose = require('mongoose');
var Sets = require('server/db/db').Sets;
var Inventory = require('server/db/db').Inventory;
var express = require('express');
var router = express.Router();

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
	 sets.save(function(err, results) {
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
		res.send({cards: results});
	});
});

router.post('/getDecks', function(req, res) {
	console.log(req.body.username);
	Inventory.findOne({username: req.body.username}, function(err, results) {
		if(err) { console.log(err); }
		console.log(results);
		res.send({cards: results});
	});
});

module.exports = router;