const productService = require('../services/product.service');

exports.listProducts = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;

  const result = productService.getPaginatedProducts(page, limit);

  res.json({
    page,
    limit,
    total: result.total,
    products: result.data
  });
};

exports.getProductDetail = (req, res) => {
  const id = req.params.id;
  const product = productService.getProductById(id);
  if (!product) return res.status(404).json({ message: 'Product not found' });

  res.json(product);
};
