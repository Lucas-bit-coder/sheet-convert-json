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
const modelTour = require("./models/tour");
mongoose.connect("mongodb://localhost:27017/sheet-converted-json");

app.post("/users", uploadType, async (req, res) => {
  const file = reader.readFile(req.file.destination + req.file.filename);
  let data = [];

  const sheets = file.SheetNames;

  for (let i = 0; i < sheets.length; i++) {
    const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
    temp.forEach(async (res) => {
      data.push(res);
      let user = new modelUser(res);
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
      data.push(res);
      let product = new modelProduct(res);
      const result = await product.save();
    });
  }
  res.send(data);
});

app.post("/tours", uploadType, async (req, res) => {
  const file = reader.readFile(req.file.destination + req.file.filename);
  let data = [];

  const sheets = file.SheetNames;

  for (let i = 0; i < sheets.length; i++) {
    const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
    temp.forEach(async (res) => {
      data.push(res);
      let tour = new modelTour(res);
      const result = await tour.save();
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

app.listen(PORT, () => {
  console.log(`🚀👍 Serviço executando em: http://localhost:${PORT}`);
});
