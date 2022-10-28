const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    nome: String,
    email: String,
    cpf: String,
    dataNascimento: String,
    rg: String,
    sexo: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", UserSchema);
