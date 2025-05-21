const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const productRoutes = require('./routers/product.routes');
const authRoutes = require('./routers/auth.routes');
const cartRoutes = require('./routers/cart.routes');
const orderRoutes = require('./routers/order.routes');

// Use routes
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

// Root route for health check
app.get('/', (req, res) => {
  res.send('📦 E-Commerce API is running...');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

