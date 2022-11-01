const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    category: String,
    name: String,
    size: String,
    value: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("product", ProductSchema);
