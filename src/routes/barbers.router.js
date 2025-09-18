const express = require("express");
const {createLocal, getAll} = require("../controller/barbersController");

const router = express.Router();

router.post("/create_local", createLocal);

router.get("", getAll)

module.exports = {router};