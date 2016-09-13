const authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');
//session false will disable session based cookie esp since we are using tokens
const requireAuth = passport.authenticate('jwt', { session: false })

module.exports = function (app){
  app.post('/signup', authentication.signup)
}
