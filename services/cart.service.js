const carts = require('../models/cart');

exports.getUserCart = (userId) => {
  return carts[userId] || [];
};

exports.addToCart = (userId, productId, quantity) => {
  if (!carts[userId]) carts[userId] = [];

  const existingItem = carts[userId].find(item => item.productId === productId);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    carts[userId].push({ productId, quantity });
  }

  return carts[userId];
};

exports.removeFromCart = (userId, productId) => {
  if (!carts[userId]) return [];
  carts[userId] = carts[userId].filter(item => item.productId !== productId);
  return carts[userId];
};

exports.clearCart = (userId) => {
  carts[userId] = [];
};
