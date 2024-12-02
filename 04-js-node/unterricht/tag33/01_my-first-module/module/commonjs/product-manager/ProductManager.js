const fs = require('node:fs'); // commonJS
const path = require('node:path');

// console.log(__dirname);

// const myPath = '.  /module/commonjs/' + '../commonjs/' + '/products.json';

let dataPath = path.resolve(__dirname, 'products.json');

const saveProduct = (product) => {
  const products = loadAllProducts();
  products.push(product);
  fs.writeFileSync(dataPath, JSON.stringify(products, null, 2));
};

const loadAllProducts = () => {
  try {
    const data = fs.readFileSync(dataPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.log('file not found');
    return [];
  }
};

const loadProduct = (id) => {
  const products = loadAllProducts();
  return products.find((product) => product.id === id);
};

const updateProduct = (id, product) => {
  const products = loadAllProducts();
  const index = products.findIndex((p) => p.id === id);
  if (index !== -1) {
    products[index] = { ...product, id };
    fs.writeFileSync(dataPath, JSON.stringify(products, null, 2));
  }
};

const deleteProduct = (id) => {
  const products = loadAllProducts();
  const filteredProducts = products.filter((product) => product.id !== id);
  fs.writeFileSync(dataPath, JSON.stringify(filteredProducts, null, 2));
};

const setDataPath = (newDataPath) => {
  dataPath = newDataPath;
};

// exports.variable = 'test';
// exports.fn = () => {}

// exports - Objekt zum Freigeben von Einheiten in der commonjs-Schreibweise
module.exports = {
  // saveProduct: saveProduct,
  saveProduct,
  loadAllProducts,
  loadProduct,
  updateProduct,
  deleteProduct,
  setDataPath,
};
