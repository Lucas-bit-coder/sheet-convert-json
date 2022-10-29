const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    categoria: String,
    nome: String,
    tamanho: String,
    valor: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("product", ProductSchema);
