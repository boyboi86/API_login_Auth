const passport = require('passport');
const user = require('../model/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

//create local Strategy
const localOptions = { usernameField: 'email' }
const localLogin = new LocalStrategy( localOptions , function(email, password, done){
  //verification done with user else false
  
})

// Setup Options for jwt Strategy
const JwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

//create JWT Strategy
const jwtLogin = new JwtStrategy(JwtOptions, function(payload, done){
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
