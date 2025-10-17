const express = require('express');
const {createUser, getById, getAll} = require('../../controller/clientController');

const router = express.Router();

router.post('/create_client', createUser);
router.get('/get_client', getAll);

module.exports = {router};