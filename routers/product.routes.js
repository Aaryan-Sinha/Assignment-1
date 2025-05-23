const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

router.get('/', productController.listProducts);
router.get('/:id', productController.getProductDetail);

module.exports = router;
