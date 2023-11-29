var mongoose = require('mongoose'),
Schema = mongoose.Schema,
passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unqiue:true
    },
    phone:{
        type:String,
        required:true
    },
    address:{
        type: String,
        required: true,
    },
    admin:{
      type: String,
        required: true,
    }
  });

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('users', User);
