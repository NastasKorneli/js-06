import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// __dirname existiert nicht in der ESM Node Schreibweise und wird über dirname -Methode von path Modul ermittelt
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let dataPath = path.resolve(__dirname, 'products.json');

const saveProduct = (product) => {
  const products = loadAllProducts();

  const duplicateProduct = products.find((obj) => {
    return Number(obj.id) === Number(product.id);
  });

  // Guard
  if (duplicateProduct) {
    console.log('Found duplicate ID');
    return;
  }
  products.push(product);
  fs.writeFileSync(dataPath, JSON.stringify(products, null, 2));
};

const loadAllProducts = () => {
  try {
    const data = fs.readFileSync(dataPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
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

  // Guard - Wenn zu aktualiserndes Produkt nicht gefunden, dann vorzeitiger Abschluss
  if (index === -1) return;

  products[index] = { ...products[index], ...product };
  fs.writeFileSync(dataPath, JSON.stringify(products, null, 2));
};

const deleteProduct = (id) => {
  const products = loadAllProducts();
  const filteredProducts = products.filter((product) => product.id !== id);
  fs.writeFileSync(dataPath, JSON.stringify(filteredProducts, null, 2));
};

const setDataPath = (newDataPath) => {
  dataPath = newDataPath;
};

// ESM - export Statement (Schlüsselwort)
export default {
  saveProduct,
  loadAllProducts,
  loadProduct,
  updateProduct,
  deleteProduct,
  setDataPath,
};
