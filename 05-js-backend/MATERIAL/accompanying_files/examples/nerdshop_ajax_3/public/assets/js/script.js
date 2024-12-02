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

  DOM.buttonProductAdd = DOM.productManager.querySelector(
    '.button-product-add'
  );

  DOM.modalProductAdd = DOM.productManager.querySelector('#modal-product-add');

  DOM.formProductAdd = DOM.modalProductAdd.querySelector('.form-product-add');
  DOM.inputProductCode =
    DOM.modalProductAdd.querySelector('input[name="code"]');
  DOM.inputProductTagline = DOM.modalProductAdd.querySelector(
    'input[name="tagline"]'
  );
  DOM.textareaProductShortDescription = DOM.modalProductAdd.querySelector(
    'textarea[name="shortDescription"]'
  );
  DOM.inputProductQuantity = DOM.modalProductAdd.querySelector(
    'input[name="quantity"]'
  );
  DOM.inputProductPrice = DOM.modalProductAdd.querySelector(
    'input[name="price"]'
  );

  DOM.buttonProductConfirmAdd = DOM.modalProductAdd.querySelector(
    '.button-product-confirm-add'
  );

  const bsModalProductAdd = new bootstrap.Modal(DOM.modalProductAdd);

  console.log(DOM);
  // === INIT =============
  const init = () => {
    getProducts();
    DOM.buttonProductAdd.addEventListener('click', () => {
      console.log('click');
      DOM.modalProductAdd.querySelector('.modal-product-title').textContent =
        'Add Product';
      DOM.modalProductAdd.querySelector(
        '.button-product-confirm-add'
      ).textContent = 'Add Product';
    });

    DOM.formProductAdd.addEventListener('submit', (e) => {
      e.preventDefault();

      const product = {
        code: DOM.inputProductCode.value,
        tagline: DOM.inputProductTagline.value,
        shortDescription: DOM.textareaProductShortDescription.value,
        quantity: DOM.inputProductQuantity.value,
        price: DOM.inputProductPrice.value,
      };

      console.log(product);
      addProduct(product);
    });
  };

  // === EVENTHANDLER =====
  const onClickProductEdit = (e) => {
    console.log('edit');
  };

  const onClickProductDelete = (e) => {
    console.log('delete');
  };

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

  const addProduct = (product) => {
    fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    })
      .then((res) => {
        if (res.status === 201) {
          return res.json();
        }
      })
      .then((data) => {
        console.log(data);
        getProducts();
        DOM.formProductAdd.reset();
        bsModalProductAdd.hide();
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
      const buttonProductEdit = productEl.querySelector('.button-product-edit');
      const buttonProductDelete = productEl.querySelector(
        '.button-product-delete'
      );
      const buttonProductShow = productEl.querySelector('.button-product-show');

      productEl.dataset.id = product.id;
      productEl.querySelector('.code').textContent = product.code;
      productEl.querySelector('.tagline').textContent = product.tagline;
      productEl.querySelector('.short-description').textContent =
        product.shortDescription;

      buttonProductEdit.addEventListener('click', onClickProductEdit);
      buttonProductDelete.addEventListener('click', onClickProductDelete);
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
      stockwarn = false,
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
    const alertStockwarnEl = cardProductEl.querySelector('.alert-stockwarn');
    const idEl = cardProductEl.querySelector('.card-product-id');
    const buttonCloseEl = cardProductEl.querySelector('.button-card-close');

    codeEl.textContent = code;
    taglineEl.textContent = tagline;
    priceEl.textContent = price;
    quantityEl.textContent = quantity;
    shortDescriptionEl.textContent = shortDescription;
    idEl.textContent = product.id;

    if (stockwarn) {
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
