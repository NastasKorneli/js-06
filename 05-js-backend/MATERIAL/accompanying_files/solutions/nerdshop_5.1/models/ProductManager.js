import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const defaultDataPath = path.resolve(__dirname, 'products.json');

const ProductManager = (dataPath = defaultDataPath) => {
  let products = [];

  const save = (product) => {
    const id = crypto.randomBytes(16).toString('hex');

    products.push({ ...product, id });
    fs.writeFileSync(dataPath, JSON.stringify(products, null, 2));
  };

  const load = () => {
    try {
      const data = fs.readFileSync(dataPath, 'utf-8');
      products = JSON.parse(data);
      return products;
    } catch (error) {
      return [];
    }
  };

  const getAll = () => {
    return products;
  };

  const get = (id) => {
    return products.find((product) => product.id === id);
  };

  const getByCode = (code) => {
    return products.find(
      (product) =>
        product.code.trim().toLowerCase() === code.trim().toLowerCase()
    );
  };

  const update = (id, product) => {
    const index = products.findIndex((p) => p.id === id);
    if (index !== -1) {
      products[index] = { ...product, id };
      fs.writeFileSync(dataPath, JSON.stringify(products, null, 2));
    }
  };

  // delete is a reserved keyword in JavaScript therefore we use remove
  const remove = (id) => {
    products = products.filter((product) => product.id !== id);
    fs.writeFileSync(dataPath, JSON.stringify(products, null, 2));
  };

  const set = (key, value) => {
    if (key === 'path') {
      dataPath = value;
    }
  };

  return {
    save,
    load,
    getAll,
    get,
    getByCode,
    update,
    remove,
    set,
  };
};

export default ProductManager;
