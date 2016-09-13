const user = require('../model/user');

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
      return res.status(422).send({ error: 'Email is invalid' })
    }

    const User = new user({
      email: email,
      password: password
    })

    User.save(function(err){
      if(err){
        return next(err);
      }
      res.json(User);
    })

  })
}
