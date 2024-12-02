// const fs = require('fs'); // CommonJS
import fs from 'node:fs'; // ESM - Schreibweise
import color from 'chalk'; // Modul für bunte Terminalausgaben

const STOCK_WARN_AMOUNT = 5;

// Asynchroner Prozess
fs.readFile('./data/products.csv', 'utf-8', (error, data) => {
  const products = data.split('\n');

  const headerStr = products.shift(); // remove header
  const headerAr = headerStr.split(/\s*,\s*/); // => ["Code","Short Description","Tagline","Quantity","Price"]

  // console.log(products);

  const entries = products
    .filter((row) => row !== '') // leere Stringzeilen werden rausgefiltert
    .map(recordToHTML); // Funktionsreferenz - anstatt  .map((cv) => { return recordToHTML(cv) })

  // console.log(color.yellow('<ul class="list-group">'));
  // entries.forEach((entry) => console.log(color.yellow(entry)));
  // console.log(color.yellow('</ul>'));

  writeToHtmlFile(entries);
});

// Funktionen ================

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

const writeToHtmlFile = (entries) => {
  const headerStr = `<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Products</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
  </head>
  <body>
    <main>
      <div class="container py-5">`;

  const footerStr = `</div>
    </main>
  </body>
</html>`;

  const html = `${headerStr}
    <ul class="list-group">${entries.join('')}</ul>
    ${footerStr}`;

  // fs.writeFileSync('products.html', html, 'utf8');
  fs.writeFile('products.html', html, 'utf8', (error) => {
    if (error) console.log('something went wrong');
    console.log('File created.');
  });
};
