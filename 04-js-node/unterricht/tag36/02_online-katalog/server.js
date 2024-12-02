import fs from 'node:fs';
import express from 'express';
import color from 'chalk';

const PORT = 8080;
const HOST = '127.0.0.1'; // 'localhost'
const BASE_URL = `http://${HOST}:${PORT}`;
const CSV_PATH = 'data/products.csv';
const STOCK_WARN_AMOUNT = 5;

const app = express();

fs.readFile(CSV_PATH, 'UTF-8', (error, data) => {
  if (error) console.lor(error);

  const products = data.split('\n');
  products.shift(); // erste Zeile entfernen.

  const entries = products.filter((row) => row !== '').map((row) => recordToHtml(row));

  // Route für ein Produkt
  app.get('/product/:id', (req, res) => {
    // :id -> routenparameter
    const idx = req.params.id - 1;
    res.send(entries[idx]);
  });

  // app.get('/product/1', (req, res) => {
  //   res.send(entries[1]);
  // });

  // app.get('/product/2', (req, res) => {
  //   res.send(entries[2]);
  // });
});

// Functions
const recordToHtml = (str) => {
  const fields = str.split(/\s*,\s*/);

  const html = `<li class="list-group-item">
    <h2>${fields[1]}</h2>
    <p>${fields[2]}</p>
    <p><strong>Price:</strong> EUR ${fields[4]}</p>
    ${Number(fields[3]) <= STOCK_WARN_AMOUNT ? '<p class="alert alert-warning">Last items in stock!</p>' : ''}
  </li>`;

  return html;
};

// Middleware
app.use(express.static('./public'));

// Routes
app.get('/', (req, res) => {
  res.send('Server works..');
});

// Server start
app.listen(PORT, HOST, () => {
  console.log(color.green(`🚀 SERVER IS RUNNING AT: ${BASE_URL}`));
  console.log(color.yellow('CTRL + C to shutdown'));
});
