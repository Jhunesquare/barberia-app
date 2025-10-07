const express = require('express');
const {createClient, getById, getAll} = require('../../controller/clientController');

const router = express.Router();

router.post('/create_client', createClient);
router.get('/get_client', getAll);

module.exports = {router};