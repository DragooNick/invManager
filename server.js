var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var passport = require('passport');
var User = require('server/db/db').User;
var routes = require('server/routes');

require('config/passport.js')(passport);

var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressSession({
  secret: process.env.SESSION_SECRET || 'invManSecret',
  resave: true,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

routes(app, passport);

app.get('/', function(req, res) {
  res.send('\
    <!DOCTYPE html>\
    <html>\
      <head>\
        <title>TCG Inventory Manager</title>\
        <base href="/">\
      </head>\
      <body>\
        <div ui-view></div>\
        <script src="bundle.js"></script>\
      </body>\
    </htm>\
  ');
});


//https://scotch.io/tutorials/easy-node-authentication-setup-and-local
app.post('/lol', passport.authenticate('local', {
        successRedirect : '/',
        failureRedirect : '/about'
}));

//BAD REQUEST 400
app.post('/lolig', passport.authenticate('local'), function(req, res) {
  console.log('login (server.js): ' + req.user.name);
  res.redirect('/');
});

app.get('/lol', passport.authenticate('local', {
        successRedirect : '/',
        failureRedirect : '/about'
}), function(req, res) {
  console.log('login (server.js): ' + req.user.name);
});

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

app.all('/*', function(req, res) {
  res.send('\
    <!DOCTYPE html>\
    <html>\
      <head>\
        <title>TCG Inventory Manager</title>\
        <base href="/">\
      </head>\
      <body>\
        <div ui-view></div>\
        <script src="bundle.js"></script>\
      </body>\
    </htm>\
  ');
});

app.listen(PORT, function() {
  console.log('Server running on ' + 'http://127.0.0.1:' + PORT);
});