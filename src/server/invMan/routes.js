var mongoose = require('mongoose');
var Test = require('server/db/db').Test;
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
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

router.put('/sets', function(req, res) {
	 var test = new Test(req.body);
	 test.save(function(err, results) {
	 	if(err) { console.log(err); }
	 	res.send("Done!");
	 });
});

module.exports = router;