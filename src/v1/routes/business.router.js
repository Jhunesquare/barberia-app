const express = require('express');
const {createBusiness, getAll} = require('../../controller/businessController');

const router = express.Router();

router.post('/create_business', createBusiness);
router.get('/', getAll);

module.exports = {router};