import productManager from './modules/ProductManager.js';

productManager.setDataPath('./data/products.json');

productManager.saveProduct({
  id: 1,
  name: 'Product 1',
  price: 9.99,
  description: 'A great product',
});

productManager.saveProduct({
  id: 1,
  name: 'Product 1',
  price: 9.99,
  description: 'A great product',
});

productManager.updateProduct(1, {
  name: 'Product 1 Updated',
});

console.log(productManager.loadAllProducts());

// Verbessere das Modul:

// Beim Speichern eines Produkts sollen Produkte mit bereits existierender id nicht gespeichert werden.

// Beim Aktualisieren eines Produkts sollen alle existierenden Eigenschaften weiterhin im aktualisierten Objekt bestehen bleiben.
