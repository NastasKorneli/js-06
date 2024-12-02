import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ProductManager = () => {
  // __dirname existiert nicht in der ESM Node Schreibweise und wird über dirname -Methode von path Modul ermittelt
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  let dataPath = path.resolve(__dirname, 'products.json');
  let products = [];

  const save = (product) => {
    const products = getAll();

    const duplicate = products.find((obj) => {
      return Number(obj.id) === Number(product.id);
    });

    // Guard
    if (duplicate) {
      console.log('Found duplicate ID');
      return;
    }
    products.push(product);
    fs.writeFileSync(dataPath, JSON.stringify(products, null, 2));
  };

  const load = () => {
    try {
      const data = fs.readFileSync(dataPath, 'utf-8');
      products = JSON.parse(data);
    } catch (error) {
      products = [];
    }
  };

  const getAll = () => {
    return products;
  };

  const get = (id) => {
    const products = getAll();
    return products.find((product) => product.id === id);
  };

  const getByCode = (code) => {
    const products = getAll();
    return products.find((product) => product.code.toLowerCase() === code.toLowerCase());
  };

  const update = (id, product) => {
    const products = getAll();
    const index = products.findIndex((p) => p.id === id);

    // Guard - Wenn zu aktualiserndes Produkt nicht gefunden, dann vorzeitiger Abschluss
    if (index === -1) return;

    products[index] = { ...products[index], ...product };
    fs.writeFileSync(dataPath, JSON.stringify(products, null, 2));
  };

  const remove = (id) => {
    const products = getAll();
    const filteredProducts = products.filter((product) => product.id !== id);
    fs.writeFileSync(dataPath, JSON.stringify(filteredProducts, null, 2));
  };

  const setDataPath = (newDataPath) => {
    dataPath = newDataPath;
  };

  return {
    save,
    load,
    get,
    getAll,
    update,
    remove,
    setDataPath,
    getByCode,
  };
};

export default ProductManager;
