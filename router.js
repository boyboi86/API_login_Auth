const authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');
//session false will disable session based cookie esp since we are using tokens
const requireAuth = passport.authenticate('jwt', { session: false })
const requireSignin = passport.authenticate('local', { session: false })

module.exports = function (app){
  app.get('/', requireAuth, function(req, res){
    res.json({ message: 'authentication header is there'})
  })
  app.post('/signin', requireSignin, authentication.signin)
  app.post('/signup', authentication.signup)
}
