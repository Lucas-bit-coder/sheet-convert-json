const mongoose = require("mongoose");

const toursSchema = new mongoose.Schema(
  {
    tour: String,
    value: String,
    dateTime: String,
    driving: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("tours", toursSchema);