const express = require("express");
const {schedule} = require("../controller/scheduleController");

const router = express.Router();

router.post("/", schedule);

module.exports = {router};