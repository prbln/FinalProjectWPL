const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  Order_details: {
    type: Array,
    required: true,
  },
});
module.exports = mongoose.model("orders", orderSchema);
