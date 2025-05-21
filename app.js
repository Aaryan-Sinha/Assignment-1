const express = require('express');
const app = express();

app.use(express.json());

const productRoutes = require('./routers/product.routes');
const cartRoutes = require('./routers/cart.routes');
const orderRoutes = require('./routers/order.routes');
const userRoutes = require('./routers/user.routes');

app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));
