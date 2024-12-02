// const fs = require('fs'); // CommonJS
import fs from 'node:fs'; // ESM - Schreibweise
import color from 'chalk'; // Modul für bunte Terminalausgaben

const data = fs.readFileSync('./data/products.csv', 'utf-8');
const STOCK_WARN_AMOUNT = 5;

const products = data.split('\n');

const headerStr = products.shift(); // remove header
const headerAr = headerStr.split(/\s*,\s*/); // => ["Code","Short Description","Tagline","Quantity","Price"]

// console.log(products);

const recordToHTML = (record) => {
  const fields = record.split(/\s*,\s*/);
  const html = `<li class="list-group-item">
    <h2>${fields[1]}</h2>
    <p>${fields[2]}</p>
    <p><strong>Price:</strong> EUR ${fields[4]}</p>
    ${Number(fields[3]) <= STOCK_WARN_AMOUNT ? '<p class="alert alert-warning">Last items in stock!</p>' : ''}
  </li>`;

  return html;
};

const entries = products
  .filter((row) => row !== '') // leere Stringzeilen werden rausgefiltert
  .map(recordToHTML); // Funktionsreferenz - anstatt  .map((cv) => { return recordToHTML(cv) })

console.log(color.yellow('<ul class="list-group">'));
entries.forEach((entry) => console.log(color.yellow(entry)));
console.log(color.yellow('</ul>'));

console.log('ready');
