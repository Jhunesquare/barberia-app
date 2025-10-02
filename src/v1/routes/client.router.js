const express = require('express');
const {createClient, getById} = require('../../controller/clientController');

const router = express.Router();

router.post('/create_client', createClient);
router.get('/get_client', getById);

module.exports = {router};