import color from 'chalk'; // Modul für farbige Konsolenausgaben
import express from 'express'; // Webserver-Framework für Node.js

import ProductManager from './models/ProductManager.js';

const app = express();

const HOST = '127.0.0.1'; //or 'localhost'
const PORT = 8081;
const BASE_URL = `http://${HOST}:${PORT}`;

const productManager = ProductManager();
productManager.set('path', 'data/products.json');
productManager.load();

console.log(productManager.getProductsTotal());

// Express Setting - EJS Template Engine
app.set('view engine', 'ejs');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// API Routes
app.post('/api/products', (req, res) => {
  const product = req.body;
  const newProduct = productManager.save(product);
  if (!newProduct) {
    res.status(400).send({ msg: 'Product not added' });
    return;
  }
  res.json({ msg: 'Product added', status: 200 });
});

app.get('/api/products', (req, res) => {
  const products = productManager.getAll();
  if (!products) {
    res.status(404).send({ msg: 'Products not found' });
    return;
  }
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const id = req.params.id;
  const product = productManager.get(id);
  if (!product) {
    res.status(404).send({ msg: 'Product not found' });
    return;
  }
  res.json(product);
});

app.put('/api/products', (req, res) => {
  const product = req.body;
  const updatedProduct = productManager.update(product);
  if (!updatedProduct) {
    res.status(400).send({ msg: 'Product not updated' });
    return;
  }
  res.json({ msg: 'Product updated', status: 200 });
});

app.delete('/api/products/:id', (req, res) => {
  const id = req.params.id;
  const removedProduct = productManager.remove(id);
  if (!removedProduct) {
    res.status(400).send({ msg: 'Product not removed' });
    return;
  }
  res.json({ msg: 'Product removed', status: 200 });
});

app.listen(PORT, HOST, () => {
  console.log(color.magenta(`Server running at ${BASE_URL}`));
  console.log(color.yellow('Press Ctrl+C to quit.'));
});
