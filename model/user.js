const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

//Define model
const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true
    },
  password: String
})

//on save hook, encrypt password
userSchema.pre('save', function(next){
  let user= this;
//gen salt before callback
  bcrypt.genSalt(10, function(err, salt){
  if(err) {
    return next(err)
  }
//callback consist of hash
  bcrypt.hash(user.password, salt, null, function(err, hash){
    if(err) {
      return next(err)
    }
    //overwrite plain password with new hash
    user.password = hash;
    //proceed with a salt hashed password in db
    next();
    })
  })
})
//create method for decryption
userSchema.methods.comparePassword = function(candidatePassword, callback){
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
    if(err){
      return callback(err);
    }
    callback(null, isMatch);
  })
}

//Create model class
const ModelClass = mongoose.model('users', userSchema);

//export user model
module.exports = ModelClass;
