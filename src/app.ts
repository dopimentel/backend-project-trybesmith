import express from 'express';
import productsService from './services/products.service';

const app = express();

app.use(express.json());

app.get('/products', async (req, res) => {
  const products = await productsService.getAll();
  res.json(products);
});

app.post('/products', async (req, res) => {
  const product = await productsService.create(req.body);
  res.status(201).json(product);
});

export default app;
