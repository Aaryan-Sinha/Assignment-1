const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.use(authMiddleware);

router.post('/', orderController.createOrder);
router.get('/', orderController.getOrderHistory);

module.exports = router;
