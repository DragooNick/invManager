var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var routes = require('server/routes');

var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressSession({
  secret: process.env.SESSION_SECRET || 'invManSecret',
  resave: true,
  saveUninitialized: false
}));

routes(app);

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