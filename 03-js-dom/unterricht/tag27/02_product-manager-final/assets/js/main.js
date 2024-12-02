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
    btnEl.parentNode.parentNode.remove();
    console.log('click');
    disableNonFunctionalBtns();
  };

  const onClickProductMoveUp = (e) => {
    console.log('click');
    const btnEl = e.currentTarget;
    const trCurrentEl = btnEl.parentNode.parentNode;

    DOM.tBody.insertBefore(trCurrentEl, trCurrentEl.previousElementSibling);
    disableNonFunctionalBtns();
  };

  const onClickProductMoveDown = (e) => {
    console.log('click');
    const btnEl = e.currentTarget;
    const trCurrentEl = btnEl.parentNode.parentNode;

    DOM.tBody.insertBefore(trCurrentEl, trCurrentEl.nextElementSibling.nextElementSibling);
    disableNonFunctionalBtns();
  };

  // === XHR/FETCH ========

  // === FUNCTIONS ========
  const addProduct = (product) => {
    // Desctructuring von einem Object
    const { name, price } = product;

    const tdNameEl = createTd(name);
    const tdPriceEl = createTd(price);
    const tdWithRemoveBtn = createTdWithBtns();

    const trEl = createTr(tdNameEl, tdPriceEl, tdWithRemoveBtn);

    console.log(trEl);
    DOM.tBody.appendChild(trEl); // Erstelltes tr-Element (node) wird im DOM hinzugefügt
  };

  const initProducts = () => {
    PRODUCTS.forEach((product) => {
      addProduct(product);
    });
    // PRODUCTS.forEach(addProduct); // direktes aufrufen der Higher Order Funktion über Funktionsreferenz
  };

  const createTr = (...tds) => {
    const trEl = document.createElement('tr');
    tds.forEach((td) => {
      trEl.appendChild(td);
    });
    return trEl;
  };

  const createTd = (text = '') => {
    const tdEl = document.createElement('td');
    tdEl.textContent = text;
    return tdEl;
  };

  const createTdWithBtns = () => {
    const tdEl = document.createElement('td');
    const btnRemoveEl = createBtn({
      classes: ['btn-danger', 'button-product-remove'],
      iconName: 'trash-can',
      label: 'Remove Product',
      clickHandler: onClickProductRemove,
    });
    const btnMoveUpEl = createBtn({
      classes: ['btn-secondary', 'button-product-move-up'],
      iconName: 'angle-up',
      label: 'Move Up Product',
      clickHandler: onClickProductMoveUp,
    });
    const btnMoveDownEl = createBtn({
      classes: ['btn-secondary', 'button-product-move-down'],
      iconName: 'angle-down',
      label: 'Move Down Product',
      clickHandler: onClickProductMoveDown,
    });

    tdEl.appendChild(btnRemoveEl);
    tdEl.appendChild(btnMoveUpEl);
    tdEl.appendChild(btnMoveDownEl);
    return tdEl;
  };

  const createBtn = (opts) => {
    // Destructuring von options Objekt
    const { classes = [], iconName: icon, label, clickHandler: fn } = opts;

    const btnEl = document.createElement('button');
    const iconEl = document.createElement('i');
    const spanEl = document.createElement('span');

    btnEl.classList.add('btn', 'btn-sm', ...classes);
    iconEl.classList.add('fas', `fa-${icon}`);

    spanEl.classList.add('sr-only');
    spanEl.textContent = label;

    btnEl.addEventListener('click', fn);

    btnEl.appendChild(iconEl);
    btnEl.appendChild(spanEl);

    return btnEl;
  };

  // const btn = createBtn({
  //   classes: ['btn-danger', 'button-product-remove'],
  //   iconName: 'trash-can',
  //   label: 'Remove Product',
  //   clickHandler: (e) => {
  //     console.log('click');
  //   },
  // });

  // console.log(btn);

  // const createBtnRemove = () => {
  //   const btnEl = document.createElement('button');
  //   const iconEl = document.createElement('i');
  //   const spanEl = document.createElement('span');

  //   btnEl.classList.add('btn', 'btn-sm', 'btn-danger', 'button-product-remove');
  //   iconEl.classList.add('fas', 'fa-trash-can');
  //   spanEl.classList.add('sr-only');
  //   spanEl.textContent = 'Remove Product';

  //   btnEl.addEventListener('click', onClickProductRemove);

  //   btnEl.appendChild(iconEl);
  //   btnEl.appendChild(spanEl);

  //   return btnEl;
  // };

  // const createBtnMoveUp = () => {
  //   const btnEl = document.createElement('button');
  //   const iconEl = document.createElement('i');
  //   const spanEl = document.createElement('span');

  //   btnEl.classList.add('btn', 'btn-sm', 'btn-secondary', 'button-product-move-up');
  //   iconEl.classList.add('fas', 'fa-angle-up');
  //   spanEl.classList.add('sr-only');
  //   spanEl.textContent = 'Move Up Product';

  //   btnEl.addEventListener('click', onClickProductMoveUp);

  //   btnEl.appendChild(iconEl);
  //   btnEl.appendChild(spanEl);

  //   return btnEl;
  // };

  // const createBtnMoveDown = () => {
  //   const btnEl = document.createElement('button');
  //   const iconEl = document.createElement('i');
  //   const spanEl = document.createElement('span');

  //   btnEl.classList.add('btn', 'btn-sm', 'btn-secondary', 'button-product-move-down');
  //   iconEl.classList.add('fas', 'fa-angle-down');
  //   spanEl.classList.add('sr-only');
  //   spanEl.textContent = 'Move Down Product';

  //   btnEl.addEventListener('click', onClickProductMoveDown);

  //   btnEl.appendChild(iconEl);
  //   btnEl.appendChild(spanEl);

  //   return btnEl;
  // };

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

  init();
})();
