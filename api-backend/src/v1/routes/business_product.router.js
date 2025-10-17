const express = require('express');
const { createProduct, getProductsById } = require('../../controller/business_productController');

const router = express.Router();

router.post('/create_product', createProduct);
router.post('/', getProductsById);

module.exports = {router};