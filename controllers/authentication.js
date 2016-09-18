const user = require('../model/user');
const jwt = require('jwt-simple');
const config = require('../config');

function userToken(User){
  const timestamp = new Date().toISOString();
  return jwt.encode({ sub: User.id, iat: timestamp }, config.secret)
}

module.exports.signin = function(req, res, next){
  //user has already has their email or password authenticated
  res.send({ token: userToken(req.user)});
}

module.exports.signup = function (req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if(!password || !email){
    res.status(422).send({ error: 'must include email and password' })
  }

  user.findOne({ email: email}, function(err, existingUser){
    if(err){
       return next(err)
    }
    if(existingUser){
      return res.status(422).send({ error: 'Email is used' })
    }

    const User = new user({
      email: email,
      password: password
    })

    User.save(function(err){
      if(err){
        return next(err);
      }
      res.json({ token: userToken(User) });
    })

  })
}
