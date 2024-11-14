const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));
app.use(express.jason());
app.use(express.urlencoded({ extended: false }));

app.use(require("./routes/index"));
app.use(require("./controller/userController"));

module.exports = app;