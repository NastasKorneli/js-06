'use strict';

(() => {
  // === DOM & VARS =======
  const DOM = {};
  DOM.productManager = document.querySelector('.m-product-manager');
  DOM.products = DOM.productManager.querySelector('.products');
  DOM.templateProduct = DOM.productManager.querySelector('.template-product');
  DOM.templateCardProduct = DOM.productManager.querySelector(
    '.template-card-product'
  );

  // === INIT =============
  const init = () => {
    getProducts();
  };

  // === EVENTHANDLER =====
  const onClickProductShow = (e) => {
    console.log('show');
    const productEl = e.target.closest('.product');
    const id = productEl.dataset.id;

    getProductById(id);
  };

  const onClickCardProductClose = (e) => {
    const cardProductEl = e.target.closest('.card-product');
    cardProductEl.remove();
  };

  // === XHR/FETCH ========
  const getProducts = () => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        createProductsEls(data);
      })
      .catch((error) => console.error(error));
  };

  const getProductById = (id) => {
    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        createProductEl(data);
      })
      .catch((error) => console.error(error));
  };

  // === FUNCTIONS ========
  const createProductsEls = (products) => {
    DOM.products.innerHTML = '';
    products.forEach((product) => {
      const productEl = DOM.templateProduct.content
        .cloneNode(true)
        .querySelector('.product');

      const buttonProductShow = productEl.querySelector('.button-product-show');

      productEl.dataset.id = product.id;
      productEl.querySelector('.code').textContent = product.code;
      productEl.querySelector('.tagline').textContent = product.tagline;
      productEl.querySelector('.short-description').textContent =
        product.shortDescription;

      buttonProductShow.addEventListener('click', onClickProductShow);

      DOM.products.appendChild(productEl);
    });
  };

  const createProductEl = (product) => {
    const {
      code,
      tagline,
      shortDescription,
      quantity,
      price,
      stockWarn = false,
    } = product;

    const cardProductEl = DOM.templateCardProduct.content
      .cloneNode(true)
      .querySelector('.card-product');
    const codeEl = cardProductEl.querySelector('.card-product-code');
    const taglineEl = cardProductEl.querySelector('.card-product-tagline');
    const priceEl = cardProductEl.querySelector('.card-product-price');
    const quantityEl = cardProductEl.querySelector('.card-product-quantity');
    const shortDescriptionEl = cardProductEl.querySelector(
      '.card-product-short-description'
    );
    const alertStockwarnEl = cardProductEl.querySelector('.alert-stock-warn');
    const idEl = cardProductEl.querySelector('.card-product-id');
    const buttonCloseEl = cardProductEl.querySelector('.button-card-close');

    codeEl.textContent = code;
    taglineEl.textContent = tagline;
    priceEl.textContent = price;
    quantityEl.textContent = quantity;
    shortDescriptionEl.textContent = shortDescription;
    idEl.textContent = product.id;

    if (stockWarn) {
      alertStockwarnEl.classList.remove('d-none');
    }

    const currentProductEl = DOM.products.querySelector(
      `.product[data-id="${product.id}"]`
    );

    buttonCloseEl.addEventListener('click', onClickCardProductClose);

    insertAfter(currentProductEl, cardProductEl);
  };

  const insertAfter = (referenceNode, newNode) => {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  };

  init();
})();
