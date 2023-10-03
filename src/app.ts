import express from 'express';
import productsController from './controllers/products.controller';
import ordersController from './controllers/orders.controller';
import loginController from './controllers/login.controller';
import error from './middlewares/error';
import 'express-async-errors';
import authMiddleware from './middlewares/auth.middleware';

const app = express();

app.use(express.json());

app.get('/products', productsController.getAll);
app.post('/products', productsController.create);
app.get('/orders', ordersController.getAll);
app.post('/login', loginController.login);
app.post('/orders', authMiddleware, ordersController.create);
app.use(error);

export default app;
