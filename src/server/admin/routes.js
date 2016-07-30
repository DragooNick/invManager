var mongoose = require('mongoose');
var Test = require('server/db/db').Test;
var User = require('server/db/db').User;
var Names = require('server/db/db').Names;
var express = require('express');
var router = express.Router();

router.get('/getNames', function(req, res) {
	console.log('start query');
	Test.find(function(err, results) {
		if(err) { console.log(err); }
		console.log('show results');
		res.send(results);
	});
});

router.post('/saveNames', function(req, res) {
	console.log('start saving Names in DB');
	console.log(req.body);
	var names = new Names({names : req.body});
	names.save(function(err) {
		if(err) { console.log(err); }
		console.log('done saving');
		res.send('done saving names');
	});
});

module.exports = router;