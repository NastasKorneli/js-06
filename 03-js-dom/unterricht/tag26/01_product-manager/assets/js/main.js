'use strict';

(() => {
  // === DOM & VARS =======
  const DOM = {};
  DOM.module = document.querySelector('.m-product-manager');
  DOM.table = DOM.module.querySelector('table');
  DOM.tBody = DOM.table.querySelector('tbody');

  DOM.inputProductName = DOM.module.querySelector('.input-product-name'); // 'input[name="product-name]'
  DOM.inputProductPrice = DOM.module.querySelector('.input-product-price'); // 'input[name="product-price]'
  DOM.btnProductAdd = DOM.module.querySelector('.button-product-add');

  // console.log(DOM);

  // === INIT =============
  const init = () => {
    initProducts();

    console.log('init');
    // Event Listeners
    DOM.btnProductAdd.addEventListener('click', onClickProductAdd);
  };

  // === EVENTHANDLER =====
  const onClickProductAdd = (e) => {
    console.log('click');

    const product = {
      name: DOM.inputProductName.value,
      price: DOM.inputProductPrice.value,
    };

    addProduct(product);

    DOM.inputProductName.value = '';
    DOM.inputProductPrice.value = '';
  };

  // === XHR/FETCH ========

  // === FUNCTIONS ========
  const addProduct = (product) => {
    // Desctructuring von einem Object
    const { name, price } = product;

    const tdNameEl = createTd(name);
    const tdPriceEl = createTd(price);
    const trEl = createTr(tdNameEl, tdPriceEl);

    console.log(trEl);
    DOM.tBody.appendChild(trEl); // Erstelltes tr-Element (node) wird im DOM hinzugefügt
  };

  const initProducts = () => {
    PRODUCTS.forEach((product) => {
      addProduct(product);
    });
    // PRODUCTS.forEach(addProduct); // direktes aufrufen der Higher Order Funktion über Funktionsreferenz
  };

  const createTd = (text = '') => {
    const tdEl = document.createElement('td');
    tdEl.textContent = text;
    return tdEl;
  };

  const createTr = (...tds) => {
    const trEl = document.createElement('tr');
    tds.forEach((td) => {
      trEl.appendChild(td);
    });
    return trEl;
  };

  init();
})();
