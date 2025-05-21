const cartService = require('../services/cart.service');
const productService = require('../services/product.service');

exports.getCart = (req, res) => {
  const userId = req.user.userId;
  const cartItems = cartService.getUserCart(userId).map(item => {
    const product = productService.getProductById(item.productId);
    return { ...item, product };
  });

  res.json({ userId, items: cartItems });
};

exports.addToCart = (req, res) => {
  const userId = req.user.userId;
  const { productId, quantity } = req.body;

  const product = productService.getProductById(productId);
  if (!product) return res.status(404).json({ message: 'Product not found' });

  const updatedCart = cartService.addToCart(userId, productId, quantity);

  res.status(201).json({ message: 'Item added to cart', cart: updatedCart });
};

exports.removeFromCart = (req, res) => {
  const userId = req.user.userId;
  const { productId } = req.params;

  const updatedCart = cartService.removeFromCart(userId, productId);

  res.json({ message: 'Item removed', cart: updatedCart });
};
