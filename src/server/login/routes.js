var express = require('express');
var mongoose = require('mongoose');
var User = require('server/db/db').User;
var router = express.Router();

router.get('/', function(req, res) {
	console.log('login');
	res.send(req.body);
});

router.post('/', function(req, res) {
	res.send('Logged in');
});

router.post('/register', function(req, res) {
	User.findOne({username: req.body.username}, function(err, user) {
		if(user) {
			var oldUser = req.body;
			console.log(req.body.username + ' already exists');
			res.send(req.body.username + ' already exists registration failed');
			return;
		} else {
			var newUser = new User(req.body);
			newUser.save(function(err, user) {
				req.login(user, function(err) {
					if(err) {
						return next(err);
					}
					res.send(user);
				});
			});
		}
	});
});

router.get('/loggedIn', function(req, res) {
	res.send(req.isAuthenticated() ? req.user : '0');
});

// router.get('/', ensureAuthentication, function(req, res) {
// console.log('login');
// res.send(req.body);
// });

// function ensureAuthentication(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   } else {
//       //user is not logged in
//   }
// };

router.get('/logout', function(req, res) {
	req.logout();
	res.send('logout complete');
});

module.exports = router;