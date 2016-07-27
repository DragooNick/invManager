var passportLocal = require('passport-local');
var User = require('server/db/db').User;

module.exports = function(passport) {

  passport.serializeUser(function(user, done){
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    done(null, {id: id, name: id});
  });

  passport.use(new passportLocal.Strategy(function(username, password, done) {
    console.log('localStrat Username: ' + username + ' Password: ' + password);
    User.findOne({username: username, password: password}, function(err, user) {
      console.log('searched for user');
      if(user) {
        console.log('found');
        console.log(user);
        done(null, user);  
      } else {
        console.log('none');
        done(null, false, {message: 'Unable to login'});  
      }  
    });
    // if(username === password) {
    //   done(null, {id: username, name: username});  
    // } else {
    //   done(null, false, {message: 'Unable to login'});  
    // }
  }));
};