import express from 'express';
import color from 'chalk';
import ProductManager from './models/ProductManager.js';

const PORT = 8080;
const HOST = '127.0.0.1'; // 'localhost'
const BASE_URL = `http://${HOST}:${PORT}`;

const app = express();

// config
const productManager = ProductManager();

productManager.setDataPath('./data/products.json');
productManager.load(); // Datei wird geladen

app.set('view engine', 'ejs'); // Template Engine wird automatisch eingebunden

// Middleware
app.use(express.static('./public'));

app.use(express.json()); // HTTP-Request Body in JSON Form geparsed/intepretiert wird
app.use(express.urlencoded({ extended: true })); // HTTP-Request - Sonderzeichen in der URL oder im Body werden encoded/decoded

// Routes
app.get('/', (req, res) => {
  const products = productManager.getAll();
  // res.send(products);
  res.render('products.ejs', { products, version: 'v4' });
});

app.get('/product/:code', (req, res) => {
  const code = req.params.code;
  const product = productManager.getByCode(code);
  // res.send(products);
  res.render('product.ejs', { product });
});

// API Routes =================

// HTTP-Request Methode GET
// C(R)UD - Read alle Daten auslesen
// (B)READ - Browse
app.get('/api/products', (req, res) => {
  const products = productManager.getAll();
  // res.send(products);
  res.send(products);
});

// HTTP-Request Methode GET
// C(R)UD - Read ein Datensatz auslesen
// B(R)EAD - Read
app.get('/api/products/:code', (req, res) => {
  const code = req.params.code;
  const product = productManager.getByCode(code);

  if (!product) {
    res.status(404).send({ status: 404, message: 'File not found' });
  }

  // res.setHeader('Content-Type', 'application/json');
  // res.write(JSON.stringify(product));
  // res.end();
  res.send(product);
});

// HTTP-Request Methode POST
// (C)RUD - Create einen neuen Datensatz erstellen
// BRE(A)D - Add
app.post('/products', (req, res) => {
  const product = req.body;

  productManager.save(product);

  res.send({ status: 200, message: 'Product added' });
});

// HTTP-Request Methode PUT
// CR(U)D - Update einen Datensatz aktualisieren
// BR(E)AD - Edit
app.put('/products/:id', (req, res) => {
  const id = req.params.id;
  const product = req.body;

  productManager.update(id, product);

  res.send({ status: 200, message: 'Product updated' });
});

// HTTP-Request Methode DELETE
// CRU(D) - Delete einen Datensatz löschen
// BREA(D) - Delete
app.delete('/products/:id', (req, res) => {
  const id = req.params.id;

  productManager.remove(id);

  res.send({ status: 200, message: 'Product deleted' });
});

// Server start
app.listen(PORT, HOST, () => {
  console.log(color.green(`🚀 SERVER IS RUNNING AT: ${BASE_URL}`));
  console.log(color.yellow('CTRL + C to shutdown'));
});

// lsof -i tcp:8080
// netstat -ano | findstr :8080
