const express = require("express");
const app = express();
const reader = require("xlsx");
const multer = require("multer");
const PORT = 3002;
const files = multer({ dest: "files/" });
const uploadType = files.single("file");
const mongoose = require("mongoose");
const modelUser = require("./models/user");
mongoose.connect("mongodb://localhost:27017/sheet-converted-json");

app.post("/convert-sheet-json", uploadType, async (req, res) => {
  const file = reader.readFile(req.file.destination + req.file.filename);
  let data = [];

  const sheets = file.SheetNames;

  for (let i = 0; i < sheets.length; i++) {
    const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
    temp.forEach(async (res) => {
      data.push(res);
      let user = new modelUser(res);
      const result = await user.save();
      console.log(result);
    });
  }
  res.send(data);
});

app.listen(PORT, () => {
  console.log(`🚀👍 Serviço executando em: http://localhost:${PORT}`);
});
