const mongoose = require("mongoose");
passportLocalMongoose = require('passport-local-mongoose');
const themeSchema = new mongoose.Schema({
  Theme_Name: {
    type: String,
    required: true,
  },
  Theme_Image_Url: {
    type: String,
    required: true,
  }
});
themeSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("themes", themeSchema);;
