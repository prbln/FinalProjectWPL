const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  Theme_ID: {
    type: String,
    required: true,
  },
  Item_Name: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  Item_Price: {
    type: Number,
    required: true,
  },
  Item_Image_Url: {
    type: String,
    required: true,
  },
  Item_Qty: {
    type: Number,
    required: true,
  },
  Item_Category: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("items", itemSchema);
