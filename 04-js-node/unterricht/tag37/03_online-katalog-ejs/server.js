import fs from 'node:fs';
import express from 'express';
import color from 'chalk';
// import ejs from 'ejs'; // Bindet express bei Verwendung automatisch ein.

const PORT = 8080;
const HOST = '127.0.0.1'; // 'localhost'
const BASE_URL = `http://${HOST}:${PORT}`;
const CSV_PATH = 'data/products.csv';
const STOCK_WARN_AMOUNT = 5;

const app = express();

// Template Engine definieren
app.set('view engine', 'ejs');
// app.set('views', 'tpls'); // Standard Template-Ordner "views" kann abgeändert werden.

// Middleware
app.use(express.static('./public'));

// Routes

app.get('/fruits', (req, res) => {
  res.render('fruits.ejs', { title: 'Früchte', fruits: ['Banana', 'Erdbeer', 'Kiwi'] });
});

fs.readFile(CSV_PATH, 'UTF-8', (error, data) => {
  if (error) console.lor(error);

  const products = data.split('\n');
  products.shift(); // erste Zeile entfernen.

  const entries = products.filter((row) => row !== '').map((row) => recordToObj(row));

  // console.log(entries);

  // Route index
  app.get('/', (req, res) => {
    res.render('index.ejs', { version: 'v2', products: entries });
  });

  // Route für ein Produkt
  app.get('/product/:id', (req, res) => {
    const idx = req.params.id - 1;
    res.render('product.ejs', { product: entries[idx] });
  });

  // app.get('/product/1', (req, res) => {
  //   res.send(entries[1]);
  // });

  // app.get('/product/2', (req, res) => {
  //   res.send(entries[2]);
  // });
});

// Functions
const recordToObj = (str) => {
  const fields = str.split(/\s*,\s*/);

  // Code,Short Description,Tagline,Quantity,Price
  return {
    code: fields[0],
    shortDescription: fields[1],
    tagline: fields[2],
    quantity: Number(fields[3]),
    price: Number(fields[4]),
    stockWarn: Number(fields[3]) <= STOCK_WARN_AMOUNT, // ? true : false
  };
};

// Server start
app.listen(PORT, HOST, () => {
  console.log(color.green(`🚀 SERVER IS RUNNING AT: ${BASE_URL}`));
  console.log(color.yellow('CTRL + C to shutdown'));
});
