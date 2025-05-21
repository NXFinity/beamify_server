const express = require('express');
const router = express.Router();
const productsController = require('./productsController');

// More specific route first!
router.get('/sku/:sku', productsController.getProductBySku);
router.get('/:id', productsController.getProductById);
router.get('/', productsController.getAllProducts);

module.exports = router;
