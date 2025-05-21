const products = require('../models/products');

exports.getPaginatedProducts = (page = 1, limit = 5) => {
  const startIndex = (page - 1) * limit;
  return {
    total: products.length,
    data: products.slice(startIndex, startIndex + limit)
  };
};

exports.getProductById = (id) => {
  return products.find(p => p.id === id);
};
