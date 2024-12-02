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
    getProducts();
  };

  // === EVENTHANDLER =====

  // === XHR/FETCH ========
  const getProducts = () => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        createProducts(data);
      })
      .catch((error) => console.error(error));
  };

  // === FUNCTIONS ========
  const createProducts = (products) => {
    DOM.products.innerHTML = '';
    products.forEach((product) => {
      const productEl = DOM.templateProduct.content.cloneNode(true);
      productEl.querySelector('.code').textContent = product.code;
      productEl.querySelector('.tagline').textContent = product.tagline;
      productEl.querySelector('.short-description').textContent =
        product.shortDescription;

      DOM.products.appendChild(productEl);
    });
  };

  init();
})();
