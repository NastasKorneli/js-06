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

// Express Setting - EJS Template Engine
// app.set('view engine', 'ejs'); // wir brauchen keine EJS-Templates mehr, da die Daten per AJAX geholt werden

// Middleware
app.use(express.static('public'));

// API Routes
app.get('/api/products', (req, res) => {
  const products = productManager.getAll();
  if (!products) {
    res.status(404).send({ msg: 'Products not found' });
    return;
  }
  res.json(products);
});

app.get('/api/products/:code', (req, res) => {
  const code = req.params.code;
  const product = productManager.getByCode(code);
  if (!product) {
    res.status(404).send({ msg: 'Product not found' });
    return;
  }

  res.json(product);
});

app.listen(PORT, HOST, () => {
  console.log(color.magenta(`Server running at ${BASE_URL}`));
  console.log(color.yellow('Press Ctrl+C to quit.'));
});
