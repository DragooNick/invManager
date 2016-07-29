var passportLocal = require('passport-local');
var User = require('server/db/db').User;

module.exports = function(passport) {

  passport.serializeUser(function(user, authCheckDone){
    authCheckDone(null, user.id);
  });

  passport.deserializeUser(function(id, authCheckDone) {
    authCheckDone(null, {id: id, name: id});
  });

  passport.use(new passportLocal.Strategy({passReqToCallback: true}, function(req, username, password, authCheckDone) {
    console.log('localStrat Username: ' + username + ' Password: ' + password);
    User.findOne({username: username, password: password}, function(err, user) {
      console.log('searched for user');
      if(user) {
        console.log('found');
        console.log(user);
        authCheckDone(null, user, req.flash('authMessage', "your message"));  
      } else {
        console.log('none');
        authCheckDone(null, false, req.flash('authMessage', "your message"));  
      }  
    });
    // if(username === password) {
    //   authCheckDone(null, {id: username, name: username});  
    // } else {
    //   authCheckDone(null, false, {message: 'Unable to login'});  
    // }
  }));
};