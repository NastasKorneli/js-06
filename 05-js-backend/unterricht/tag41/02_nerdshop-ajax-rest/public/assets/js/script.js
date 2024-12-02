'use strict';

(() => {
  // === DOM & VARS =======
  const DOM = {};
  DOM.productManager = document.querySelector('.m-product-manager');
  DOM.products = DOM.productManager.querySelector('.products');
  DOM.templateProduct = DOM.productManager.querySelector('.template-product');

  console.log(DOM);
  // === INIT =============
  const init = () => {
    console.log('init');
    getProducts().then((data) => {
      console.log(data);
      createProducts(data);
    });
  };

  // === EVENTHANDLER =====

  // === XHR/FETCH ========
  const getProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      // console.log(data);
      return data;
    } catch (err) {
      console.log(err);
    }

    // fetch('/api/products')
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
  };

  // === FUNCTIONS ========
  const createProducts = (products) => {
    DOM.products.innerHTML = ''; // Product div Element wird geleert, falls nicht leer
    products.forEach((product) => {
      // desctructuring von product Object
      const { code, tagline, shortDescription: description } = product;

      const productEl = DOM.templateProduct.content.cloneNode(true);
      productEl.querySelector('.code').textContent = code;
      productEl.querySelector('.tagline').textContent = tagline;
      productEl.querySelector('.short-description').textContent = description;

      DOM.products.appendChild(productEl);
    });
  };

  init();
})();
