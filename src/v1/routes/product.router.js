const express = require('express');
const { createProduct, getAllProducts} = require('../../controller/productController');

const router = express.Router();

router.post('/create_product', createProduct);
router.get('/', getAllProducts);

module.exports = {router};