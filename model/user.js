const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Define model
const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true
    },
  password: String
})

//Create model class
const ModelClass = mongoose.model('users', userSchema);

//export user model
module.exports = ModelClass;
