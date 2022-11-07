const express = require("express");
const app = express();
const reader = require("xlsx");
const multer = require("multer");
const PORT = 3002;
const files = multer({ dest: "files/" });
const uploadType = files.single("file");
const mongoose = require("mongoose");
const modelUser = require("./models/user");
const modelProduct = require("./models/product");
const modelOrder = require("./models/order");
mongoose.connect("mongodb://localhost:27017/sheet-converted-json");

app.post("/users", uploadType, async (req, res) => {
  const file = reader.readFile(req.file.destination + req.file.filename);
  let data = [];

  const sheets = file.SheetNames;

  for (let i = 0; i < sheets.length; i++) {
    const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
    temp.forEach(async (res) => {
      const regUsers = {
        name: res.Nome,
        email: res["E-mail"],
        cpf: res.CPF,
        birthDate: res["Data de Nascimento"],
        rg: res.RG,
        sex: res.Sexo,
      };
      data.push(res);
      let user = new modelUser(regUsers);
      const result = await user.save();
    });
  }
  res.send(data);
});

app.post("/products", uploadType, async (req, res) => {
  const file = reader.readFile(req.file.destination + req.file.filename);
  let data = [];

  const sheets = file.SheetNames;

  for (let i = 0; i < sheets.length; i++) {
    const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
    temp.forEach(async (res) => {
      const regProducts = {
        category: res.categoria,
        name: res.nome,
        size: res.tamanho,
        value: res.valor,
      };
      data.push(res);
      let product = new modelProduct(regProducts);
      const result = await product.save();
    });
  }
  res.send(data);
});

app.post("/orders", uploadType, async (req, res) => {
  const file = reader.readFile(req.file.destination + req.file.filename);
  let data = [];

  const sheets = file.SheetNames;

  for (let i = 0; i < sheets.length; i++) {
    const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
    temp.forEach(async (res) => {
      const regOrders = {
        request: res.pedido,
        value: res.valor,
        delivery: res.entrega,
        payment: res.pagamento,
      };
      data.push(res);
      let order = new modelOrder(regOrders);
      const result = await order.save();
    });
  }
  res.send(data);
});

app.get("/products", async (req, res) => {
  const products = await modelProduct.find();
  res.send(products);
});

app.get("/users", async (req, res) => {
  const users = await modelUser.find();
  res.send(users);
});

app.get("/products/find", async (req, res) => {
  const products = await modelProduct.findOne({ name: req.query.name });
  res.send(products);
});

app.listen(PORT, () => {
  console.log(`🚀👍 Serviço executando em: http://localhost:${PORT}`);
});
