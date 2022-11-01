const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    cpf: String,
    birthDate: String,
    rg: String,
    sex: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", UserSchema);
