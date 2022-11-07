const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema(
  {
    request: String,
    value: String,
    delivery: String,
    payment: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("orders", ordersSchema);
