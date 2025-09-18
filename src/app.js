const express = require("express");

const authRouter = require('./routes/auth.router');
const userRouter = require('./routes/user.router');
const localRouter = require('./routes/barbers.router');
const scheduleRouter = require('./routes/schedule.router');

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true })); // Para datos en URL
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/auth", authRouter.router);
app.use("/api/v1/create_local", localRouter.router);
app.use("/api/v1/schedule", scheduleRouter.router);

module.exports = {app};