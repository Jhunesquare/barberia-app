const express = require("express");
const {auth} = require("../controller/authController");

const router = express.Router();

router.post("/", auth);

module.exports = {router};