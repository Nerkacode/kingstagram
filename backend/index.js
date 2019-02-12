const mongoose = require("mongoose")
const express = require('express')
const bodyParser = require("body-parser")
const cors = require("cors")
const apiRouter = require("./routes/routes")

const app = express();
var corsOptions = {
  exposedHeaders: ["x-auth"]
};

mongoose.connect("mongodb://localhost:27017/kingstagram", {
  useCreateIndex: true,
  useNewUrlParser: true
})

app.use('/uploads', express.static('uploads'));

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
app.use("/api", apiRouter)

app.listen(3000)