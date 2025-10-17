const express = require('express');
const { getEmployees, createEmployee } = require('../../controller/employeeController');

const router = express.Router();

router.post('/create_employee', createEmployee);
router.post('/', getEmployees);

module.exports = {router};