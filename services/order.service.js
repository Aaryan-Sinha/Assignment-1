const orders = require('../models/orders');
const productService = require('./product.service');
const cartService = require('./cart.service');
const mockPayment = require('../utils/mockPayment');
const { generateOrderId } = require('../utils/generateId');

exports.placeOrder = (userId) => {
  const cart = cartService.getUserCart(userId);
  if (!cart.length) return null;

  const orderItems = cart.map(item => {
    const product = productService.getProductById(item.productId);
    return {
      productId: item.productId,
      quantity: item.quantity,
      price: product.price,
      total: product.price * item.quantity
    };
  });

  const totalAmount = orderItems.reduce((sum, item) => sum + item.total, 0);
  const payment = mockPayment();

  const order = {
    orderId: generateOrderId(),
    userId,
    items: orderItems,
    totalAmount,
    paymentStatus: payment.status,
    paymentId: payment.paymentId,
    createdAt: new Date()
  };

  if (!orders[userId]) orders[userId] = [];
  orders[userId].push(order);
  cartService.clearCart(userId);

  return order;
};

exports.getUserOrders = (userId, page = 1, limit = 5) => {
  const userOrders = orders[userId] || [];
  const startIndex = (page - 1) * limit;

  return {
    total: userOrders.length,
    data: userOrders.slice(startIndex, startIndex + limit)
  };
};
