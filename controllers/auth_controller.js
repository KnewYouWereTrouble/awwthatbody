// Load required packages
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user')

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy(
    function(username, password, done){
        User.findOne({username : username}, function(err, user){
            if(err) return done(err)
            //No user found with that username
            if(!user || !user.verifyPassword(password)) return done(null, false)
            else return done(null, user)
        })
    }
))

exports.localAuthenticated = passport.authenticate('local')

/*
passport.use(new FacebookStrategy({
    clientID : apiKeys.facebookAuth.clientID,
    clientSecret : apiKeys.facebookAuth.clientSecret,
    callbackURL : apiKeys.facebookAuth.callbackURL,
    profileFields: ['id', 'emails', 'name', 'displayName', 'profileUrl']
  },
  function(accessToken, refreshToken, profile, done){
     User.findOne({username : profile.displayName}, function(err, user){
          if(err) return done(err)
          if(user) return done(null, user)
          else {
              var user = new User()
              user.username = profile.displayName,
              user.email = profile.emails[0].value,
              user.facebook_id = profile.id
              user.facebook_token = accessToken

              user.save(function(err, user){
                  if(err) return done(err)
                  else return done(null, user)
              })
          }
      })
  }

))
*/


//exports.facebookAuthenticated = passport.authenticate('facebook', {scope : ['email'] , failureRedirect : '/'})
