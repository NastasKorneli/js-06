import { parse } from 'csv-parse/sync';
import fs from 'node:fs';
import color from 'chalk';

const csvStr = fs.readFileSync('./data/products.csv', 'utf-8');

const toLowerCamelCase = (str) => {
  return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (match, chr) => chr.toUpperCase());
};

// Example usage:
// console.log(toLowerCamelCase('Hello World')); // helloWorld
// console.log(toLowerCamelCase('make_this_lowerCamelCase')); // makeThisLowerCamelCase

const products = parse(csvStr, {
  columns: (header) => {
    return header.map((str) => toLowerCamelCase(str));
  },
});

// products um id Eigenschaft erweitern
const data = products.map((product, idx) => {
  return { id: Number(idx + 1), ...product, quantity: Number(product.quantity), price: Number(product.price) };
});

console.log(data);

fs.writeFile('./data/products.json', JSON.stringify(data, null, 2), 'utf-8', (err) => {
  if (err) console.error(color.red(err));
  console.log(color.green('JSON Datei erstellt'));
});

// node utils/csv-parser.js
