import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const defaultDataPath = path.resolve(__dirname, 'products.json');

const STOCK_WARN_AMOUNT = 5;

const ProductManager = (dataPath = defaultDataPath) => {
  let products = [];

  const save = (product) => {
    const id = crypto.randomBytes(16).toString('hex');
    console.log(product);
    product.stockWarn = Number(product.quantity) < STOCK_WARN_AMOUNT;
    products.push({ ...product, id });

    try {
      fs.writeFileSync(dataPath, JSON.stringify(products, null, 2));
      return true;
    } catch (error) {
      console.error(error);
      return null;
    }
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

  const update = (product) => {
    const index = products.findIndex((p) => p.id === product.id);
    if (index === -1) return null;

    products[index] = product;
    products[index].stockWarn = Number(product.quantity) < STOCK_WARN_AMOUNT;

    try {
      fs.writeFileSync(dataPath, JSON.stringify(products, null, 2));
      return true;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  // delete is a reserved keyword in JavaScript therefore we use remove
  const remove = (id) => {
    const product = products.find((product) => product.id === id);
    if (!product) return null;
    if (products.splice(products.indexOf(product), 1) === 0) return null;

    try {
      fs.writeFileSync(dataPath, JSON.stringify(products, null, 2));
      return true;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const set = (key, value) => {
    if (key === 'path') {
      dataPath = value;
    }
  };

  const getProductsTotal = () => {
    return products.reduce(
      (result, obj) => result + Number(obj.price) * Number(obj.quantity),
      0
    );
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
    getProductsTotal,
  };
};

export default ProductManager;
