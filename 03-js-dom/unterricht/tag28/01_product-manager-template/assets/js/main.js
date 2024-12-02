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

  DOM.templateProductRow = DOM.module.querySelector('.template-product-row');

  // console.log(DOM);

  // === INIT =============
  const init = () => {
    initProducts();

    disableNonFunctionalBtns();

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
    disableNonFunctionalBtns();
  };

  const onClickProductRemove = (e) => {
    const btnEl = e.currentTarget;

    // btnEl.parentNode -> td.parentNode -> tr
    // btnEl.parentNode.parentNode.remove();
    parents(btnEl, 'tr')[0].remove();

    console.log('click');
    disableNonFunctionalBtns();
  };

  const onClickProductMoveUp = (e) => {
    console.log('click');
    const btnEl = e.currentTarget;
    const trCurrentEl = parents(btnEl, 'tr')[0]; // btnEl.parentNode.parentNode;

    DOM.tBody.insertBefore(trCurrentEl, trCurrentEl.previousElementSibling);
    disableNonFunctionalBtns();
  };

  const onClickProductMoveDown = (e) => {
    console.log('click');
    const btnEl = e.currentTarget;
    const trCurrentEl = parents(btnEl, 'tr')[0]; //  btnEl.parentNode.parentNode;

    DOM.tBody.insertBefore(trCurrentEl, trCurrentEl.nextElementSibling.nextElementSibling);
    disableNonFunctionalBtns();
  };

  // === XHR/FETCH ========

  // === FUNCTIONS ========
  const addProduct = (product) => {
    // Desctructuring von einem Object
    const { name, price } = product;

    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template#template_document_fragment
    const trEl = DOM.templateProductRow.content.cloneNode(true);

    const btnRemove = trEl.querySelector('.button-product-remove');
    const btnMoveUp = trEl.querySelector('.button-product-move-up');
    const btnMoveDown = trEl.querySelector('.button-product-move-down');

    trEl.querySelector('.td-name').textContent = name;
    trEl.querySelector('.td-price').textContent = price;

    btnRemove.addEventListener('click', onClickProductRemove);
    btnMoveUp.addEventListener('click', onClickProductMoveUp);
    btnMoveDown.addEventListener('click', onClickProductMoveDown);

    DOM.tBody.appendChild(trEl); // Im DOM (HTML-Strukrur) erhält tBody eine neue "geklonte" Zeile (tr)
  };

  const initProducts = () => {
    PRODUCTS.forEach((product) => {
      addProduct(product);
    });
    // PRODUCTS.forEach(addProduct); // direktes aufrufen der Higher Order Funktion über Funktionsreferenz
  };

  const disableNonFunctionalBtns = () => {
    Array.from(DOM.tBody.querySelectorAll('tr')).forEach((tr) => {
      const btnMoveUp = tr.querySelector('.button-product-move-up');
      const btnMoveDown = tr.querySelector('.button-product-move-down');

      // wenn keine Zeile davor -> !null -> btnMoveUp.disabled = true
      btnMoveUp.disabled = !tr.previousElementSibling;
      // wenn keine Zeile danach -> !null -> btnMoveDown.disabled = true
      btnMoveDown.disabled = !tr.nextElementSibling;
    });

    // // Alle tr move-up und move-down buttons aktiveren
    // Array.from(DOM.tBody.querySelectorAll('tr')).forEach((tr) => {
    //   tr.querySelector('.button-product-move-up').disabled = false;
    //   tr.querySelector('.button-product-move-down').disabled = false;
    // });

    // // Gezielt erster move-up und letzter move-down Button deaktivert
    // DOM.tBody.querySelector('tr:first-child .button-product-move-up').disabled = true;
    // DOM.tBody.querySelector('tr:last-child .button-product-move-down').disabled = true;
  };

  const parents = (el, selector) => {
    const parents = [];
    while ((el = el.parentNode) && el !== document) {
      if (!selector || el.matches(selector)) parents.push(el);
    }
    return parents;
  };

  // console.log(parents(document.querySelector('tbody'), 'div'));

  init();
})();
