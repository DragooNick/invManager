var mongoose = require('mongoose');
var Test = require('server/db/db').Test;
var User = require('server/db/db').User;
var express = require('express');
var router = express.Router();

router.get('/sets', function(req, res) {
	// var test = new Test({name: 'Test Set', code: 'TS1'});
 //  	test.save(function(err) {
 //    if (err) { consol.log(err); }
 //    res.send('Test saved');
 //  });
	 Test.find(function(err, results) {
	 	if(err) { console.log(err); }
	 	res.send({sets: results});
	 });
});

router.put('/lolsets', function(req, res) {
	 var test = new Test(req.body);
	 test.save(function(err, results) {
	 	if(err) { console.log(err); }
	 	res.send("Done!");
	 });
});

router.post('/cardSearch', function(req, res) {
	console.log('req.body ' + req.body.name);
	Test.find({"cards.name" : req.body.name},{"cards.$": 1}, function(err, results) {
		if(err) { console.log(err); }
		res.send({cards: results});
	});
});

router.post('/getInventory', function(req, res) {
	console.log(req.body.username);
	User.findOne({username: req.body.username}, function(err, results) {
		if(err) { console.log(err); }
		console.log(results);
		res.send({cards: results});
	});
});

router.post('/getDecks', function(req, res) {
	console.log(req.body.username);
	User.findOne({username: req.body.username}, function(err, results) {
		if(err) { console.log(err); }
		console.log(results);
		res.send({cards: results});
	});
});

module.exports = router;