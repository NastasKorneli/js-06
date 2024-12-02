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

  DOM.modalProductAddUpdate = DOM.productManager.querySelector(
    '#modal-product-add-update'
  );

  DOM.formProductAddUpdate = DOM.modalProductAddUpdate.querySelector(
    '.form-product-add-update'
  );
  DOM.inputProductCode =
    DOM.modalProductAddUpdate.querySelector('input[name="code"]');

  DOM.inputProductId =
    DOM.modalProductAddUpdate.querySelector('input[name="id"]');

  DOM.inputProductTagline = DOM.modalProductAddUpdate.querySelector(
    'input[name="tagline"]'
  );
  DOM.textareaProductShortDescription = DOM.modalProductAddUpdate.querySelector(
    'textarea[name="shortDescription"]'
  );
  DOM.inputProductQuantity = DOM.modalProductAddUpdate.querySelector(
    'input[name="quantity"]'
  );
  DOM.inputProductPrice = DOM.modalProductAddUpdate.querySelector(
    'input[name="price"]'
  );

  DOM.buttonProductConfirmAddUpdate = DOM.modalProductAddUpdate.querySelector(
    '.button-product-confirm-add-update'
  );

  const bsModalProductAddUpdate = new bootstrap.Modal(
    DOM.modalProductAddUpdate
  );

  console.log(DOM);
  // === INIT =============
  const init = () => {
    getProducts().then((products) => {
      createProductsEls(products);
    });
    DOM.buttonProductAdd.addEventListener('click', onClickProductAdd);

    DOM.formProductAddUpdate.addEventListener(
      'submit',
      onSubmitProductAddUpdate
    );
  };

  // === EVENTHANDLER =====
  const onSubmitProductAddUpdate = (e) => {
    e.preventDefault();

    const product = {
      code: DOM.inputProductCode.value,
      tagline: DOM.inputProductTagline.value,
      shortDescription: DOM.textareaProductShortDescription.value,
      quantity: DOM.inputProductQuantity.value,
      price: DOM.inputProductPrice.value,
      id: DOM.inputProductId.value,
    };

    console.log(product);

    if (DOM.formProductAddUpdate.dataset.action === 'add') {
      addProduct(product).then((data) => {
        console.log(data);
        getProducts().then((products) => {
          createProductsEls(products);

          DOM.formProductAddUpdate.reset();
          bsModalProductAddUpdate.hide();
        });
      });
    } else {
      updateProduct(product).then((data) => {
        console.log(data);
        getProducts().then((products) => {
          createProductsEls(products);

          DOM.formProductAddUpdate.reset();
          bsModalProductAddUpdate.hide();
        });
      });
    }
  };

  const onClickProductAdd = (e) => {
    console.log('click');
    DOM.modalProductAddUpdate.querySelector(
      '.modal-product-title'
    ).textContent = 'Add Product';
    DOM.modalProductAddUpdate.querySelector(
      '.button-product-confirm-add-update'
    ).textContent = 'Add Product';
  };

  const onClickProductEdit = (e) => {
    console.log('edit');
    const productEl = e.target.closest('.product');
    const id = productEl.dataset.id;

    getProductById(id).then((product) => {
      DOM.modalProductAddUpdate.querySelector(
        '.modal-product-title'
      ).textContent = 'Edit Product';
      DOM.modalProductAddUpdate.querySelector(
        '.button-product-confirm-add-update'
      ).textContent = 'Update Product';

      DOM.inputProductCode.value = product.code;
      DOM.inputProductTagline.value = product.tagline;
      DOM.textareaProductShortDescription.value = product.shortDescription;
      DOM.inputProductQuantity.value = product.quantity;
      DOM.inputProductPrice.value = product.price;
      DOM.inputProductId.value = product.id;

      DOM.formProductAddUpdate.dataset.action = 'update';

      bsModalProductAddUpdate.show();
    });
  };

  const onClickProductDelete = (e) => {
    console.log('delete');
    const productEl = e.target.closest('.product');
    const id = productEl.dataset.id;

    deleteProduct(id).then((data) => {
      console.log(data);
      getProducts().then((products) => {
        createProductsEls(products);
      });
    });
  };

  const onClickProductShow = (e) => {
    console.log('show');
    const productEl = e.target.closest('.product');
    const id = productEl.dataset.id;

    DOM.formProductAddUpdate.dataset.action = 'add';

    getProductById(id).then((product) => {
      createProductEl(product);
    });
  };

  const onClickCardProductClose = (e) => {
    const cardProductEl = e.target.closest('.card-product');
    cardProductEl.remove();
  };

  // === XHR/FETCH ========
  const getProducts = async () => {
    const res = await fetch('/api/products');

    try {
      const data = await res.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const getProductById = async (id) => {
    const res = await fetch(`/api/products/${id}`);
    const data = await res.json();

    try {
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
    }
    // .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //     createProductEl(data);
    //   })
    //   .catch((error) => console.error(error));
  };

  const addProduct = async (product) => {
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });

    if (res.status === 201) {
      try {
        const data = await res.json();
        console.log(data);
        return data;
      } catch (error) {
        console.error(error);
      }
    }
  };

  const updateProduct = async (product) => {
    const res = await fetch(`/api/products`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });

    if (res.status === 200) {
      try {
        const data = await res.json();
        console.log(data);
        return data;
      } catch (error) {
        console.error(error);
      }
    }
  };

  const deleteProduct = async (id) => {
    const res = await fetch(`/api/products/${id}`, {
      method: 'DELETE',
    });

    if (res.status === 200) {
      try {
        const data = await res.json();
        console.log(data);
        return data;
      } catch (error) {
        console.error(error);
      }
    }
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
