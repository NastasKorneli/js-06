'use strict';

import ProductManager from './modules/ProductManager.js';

(() => {
  // === DOM & VARS =======
  const DOM = {};
  DOM.productManagers = Array.from(document.querySelectorAll('.m-product-manager'));

  // === INIT =============
  const init = () => {
    DOM.productManagers.forEach((el) => {
      ProductManager(el);
    });
  };

  // === EVENTHANDLER =====

  // === XHR/FETCH ========

  // === FUNCTIONS ========

  init();
})();
