const orderService = require('../services/order.service');

exports.createOrder = (req, res) => {
  const userId = req.user.userId;
  const order = orderService.placeOrder(userId);

  if (!order) return res.status(400).json({ message: 'Cart is empty' });
  res.status(201).json({ message: 'Order placed successfully', order });
};

exports.getOrderHistory = (req, res) => {
  const userId = req.user.userId;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;

  const result = orderService.getUserOrders(userId, page, limit);

  res.json({
    page,
    limit,
    total: result.total,
    orders: result.data
  });
};
