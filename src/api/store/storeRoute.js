const express = require('express');
const router = express.Router();
const storeController = require('./storeController');
const productsController = require('./products/productsController');

// Public store info
router.get('/store', storeController.getStorePublic);
// Public products
router.get('/products', productsController.getAllProducts);
router.get('/products/:id', productsController.getProductById);

module.exports = router;
