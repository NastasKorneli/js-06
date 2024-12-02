import express from 'express';
import color from 'chalk';
import ProductManager from './models/ProductManager.js';

const PORT = 8080;
const HOST = '127.0.0.1'; // 'localhost'
const BASE_URL = `http://${HOST}:${PORT}`;

const app = express();

// config
ProductManager.setDataPath('./data/products.json');

app.set('view engine', 'ejs'); // Template Engine wird automatisch eingebunden

// Middleware
app.use(express.static('./public'));

// Routes
app.get('/', (req, res) => {
  const products = ProductManager.loadAllProducts();
  // res.send(products);
  res.render('products.ejs', { products, version: 'v4' });
});

app.get('/product/:code', (req, res) => {
  const code = req.params.code;
  const product = ProductManager.getProductByCode(code);
  // res.send(products);
  res.render('product.ejs', { product });
});

// API Route
app.get('/api/products', (req, res) => {
  const products = ProductManager.loadAllProducts();
  // res.send(products);
  res.send(products);
});

// Server start
app.listen(PORT, HOST, () => {
  console.log(color.green(`🚀 SERVER IS RUNNING AT: ${BASE_URL}`));
  console.log(color.yellow('CTRL + C to shutdown'));
});

// lsof -i tcp:8080
// netstat -ano | findstr :8080
