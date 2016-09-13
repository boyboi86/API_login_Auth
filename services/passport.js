const passport = require('passport');
const user = require('../model/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// Setup Options for jwt Strategy
const JwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

//create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
  user.findById(payload.sub, function(err, user){
    if(err) {
      return done(err, false);
    }
    if(user){
       done(null, user)
    } else {
      done(null, false)
    }
  })
});

//Tell Passport to use strategy
passport.use(jwtLogin);
