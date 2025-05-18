const express = require("express");
const {createEmployee} = require("../controller/authController");

const router = express.Router();

router.get("", createEmployee);

module.exports = {router};