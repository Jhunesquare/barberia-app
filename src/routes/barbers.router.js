const express = require("express");
const {createBarber, getAll} = require("../controller/barbersController");

const router = express.Router();

router.post("/create", createBarber);

router.get("", getAll)

module.exports = {router};