import Toast from './Toast.js';

const ProductManager = (el) => {
  // === DOM & VARS =======
  const DOM = {};
  DOM.module = el || document.querySelector('.m-product-manager');
  DOM.products = DOM.module.querySelector('.products');
  DOM.template = DOM.module.querySelector('.template-product');
  DOM.templateCard = DOM.module.querySelector('.template-card-product');
  DOM.buttonAdd = DOM.module.querySelector('.button-product-add');

  DOM.modalAddUpdate = DOM.module.querySelector('#modal-product-add-update');
  DOM.formAddUpdate = DOM.modalAddUpdate.querySelector(
    '.form-product-add-update'
  );
  DOM.inputCode = DOM.modalAddUpdate.querySelector('input[name="code"]');
  DOM.inputId = DOM.modalAddUpdate.querySelector('input[name="id"]');
  DOM.inputTagline = DOM.modalAddUpdate.querySelector('input[name="tagline"]');
  DOM.textareaShortDescription = DOM.modalAddUpdate.querySelector(
    'textarea[name="shortDescription"]'
  );
  DOM.inputQuantity = DOM.modalAddUpdate.querySelector(
    'input[name="quantity"]'
  );
  DOM.inputPrice = DOM.modalAddUpdate.querySelector('input[name="price"]');
  DOM.buttonConfirmAddUpdate = DOM.modalAddUpdate.querySelector(
    '.button-product-confirm-add-update'
  );

  const bsModalAddUpdate = new bootstrap.Modal(DOM.modalAddUpdate);

  // === INIT =============
  const init = () => {
    getProducts().then((products) => {
      createProductsEls(products);
    });

    const user = JSON.parse(localStorage.getItem('user'));
    const isAdmin = user && user.isAdmin ? true : false;

    // Hide add button if not admin
    if (!isAdmin) {
      DOM.buttonAdd.classList.add('d-none');
    } else {
      DOM.buttonAdd.classList.remove('d-none');
    }

    DOM.buttonAdd.addEventListener('click', onClickAdd);
    DOM.formAddUpdate.addEventListener('submit', onSubmitAddUpdate);
  };

  // === EVENTHANDLER =====
  const onSubmitAddUpdate = (e) => {
    e.preventDefault();

    const product = {
      code: DOM.inputCode.value,
      tagline: DOM.inputTagline.value,
      shortDescription: DOM.textareaShortDescription.value,
      quantity: DOM.inputQuantity.value,
      price: DOM.inputPrice.value,
    };

    console.log(product);

    if (DOM.formAddUpdate.dataset.action === 'add') {
      addProduct(product).then((data) => {
        Toast({ text: data.msg, type: 'success', show: true });
        getProducts().then((products) => {
          createProductsEls(products);

          DOM.formAddUpdate.reset();
          bsModalAddUpdate.hide();
        });
      });
    } else {
      product._id = DOM.inputId.value;
      updateProduct(product).then((data) => {
        Toast({ text: data.msg, type: 'success', show: true });
        getProducts().then((products) => {
          createProductsEls(products);

          DOM.formAddUpdate.reset();
          bsModalAddUpdate.hide();
        });
      });
    }
  };

  const onClickAdd = (e) => {
    console.log('add');
    DOM.modalAddUpdate.querySelector('.modal-product-title').textContent =
      'Add Product';
    DOM.modalAddUpdate.querySelector(
      '.button-product-confirm-add-update'
    ).textContent = 'Add Product';

    DOM.formAddUpdate.dataset.action = 'add';
    bsModalAddUpdate.show();
  };

  const onClickEdit = (e) => {
    console.log('edit');
    const productEl = e.target.closest('.product');
    const id = productEl.dataset.id;

    getProductById(id).then((product) => {
      DOM.modalAddUpdate.querySelector('.modal-product-title').textContent =
        'Edit Product';
      DOM.modalAddUpdate.querySelector(
        '.button-product-confirm-add-update'
      ).textContent = 'Update Product';

      DOM.inputCode.value = product.code;
      DOM.inputTagline.value = product.tagline;
      DOM.textareaShortDescription.value = product.shortDescription;
      DOM.inputQuantity.value = product.quantity;
      DOM.inputPrice.value = product.price;
      DOM.inputId.value = product._id;

      DOM.formAddUpdate.dataset.action = 'update';

      bsModalAddUpdate.show();
    });
  };

  const onClickDelete = (e) => {
    console.log('delete');
    const productEl = e.target.closest('.product');
    const id = productEl.dataset.id;

    deleteProduct(id).then((data) => {
      Toast({ text: data.msg, type: 'success', show: true });
      getProducts().then((products) => {
        createProductsEls(products);
      });
    });
  };

  const onClickShow = (e) => {
    console.log('show');
    const productEl = e.target.closest('.product');
    const id = productEl.dataset.id;

    DOM.formAddUpdate.dataset.action = 'add';

    // Guard - add card-product if not exists
    if (productEl.nextElementSibling.classList.contains('card-product')) return;
    getProductById(id).then((product) => {
      createProductEl(product);
    });
  };

  const onClickCardClose = (e) => {
    const cardEl = e.target.closest('.card-product');
    cardEl.remove();
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
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const addProduct = async (product) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (!res.ok) {
        const error = await res.json();
        Toast({ text: error.msg, type: 'error', show: true });
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      return data;
    } catch (error) {
      console.error('ERROR', error);
      throw error; // Re-throw the error after logging it
    }
  };

  const updateProduct = async (product) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/products`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (!res.ok) {
        const error = await res.json();
        Toast({ text: error.msg, type: 'error', show: true });
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      return data;
    } catch (error) {
      console.error('ERROR', error);
      throw error; // Re-throw the error after logging it
    }
  };

  const deleteProduct = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: 'DELETE',
      });

      if (!res.ok) {
        const error = await res.json();
        Toast({ text: error.msg, type: 'error', show: true });
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      return data;
    } catch (error) {
      console.error('ERROR', error);
      throw error; // Re-throw the error after logging it
    }
  };

  // === FUNCTIONS ========
  const createProductsEls = (products) => {
    DOM.products.innerHTML = '';
    const user = JSON.parse(localStorage.getItem('user'));
    const isAdmin = user && user.isAdmin ? true : false;
    console.table({ user });
    products.forEach((product) => {
      const productEl = DOM.template.content
        .cloneNode(true)
        .querySelector('.product');

      const buttonEdit = productEl.querySelector('.button-product-edit');
      const buttonDelete = productEl.querySelector('.button-product-delete');
      const buttonShow = productEl.querySelector('.button-product-show');
      const adminActionsEl = productEl.querySelector('.product-admin-actions');

      if (!isAdmin) {
        adminActionsEl.remove();
      } else {
        adminActionsEl.classList.remove('d-none');
      }

      productEl.dataset.id = product._id;
      productEl.querySelector('.code').textContent = product.code;
      productEl.querySelector('.tagline').textContent = product.tagline;
      productEl.querySelector('.short-description').textContent =
        product.shortDescription;

      buttonEdit.addEventListener('click', onClickEdit);
      buttonDelete.addEventListener('click', onClickDelete);
      buttonShow.addEventListener('click', onClickShow);

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
      _id,
    } = product;

    const cardEl = DOM.templateCard.content
      .cloneNode(true)
      .querySelector('.card-product');
    const codeEl = cardEl.querySelector('.card-product-code');
    const taglineEl = cardEl.querySelector('.card-product-tagline');
    const priceEl = cardEl.querySelector('.card-product-price');
    const quantityEl = cardEl.querySelector('.card-product-quantity');
    const shortDescriptionEl = cardEl.querySelector(
      '.card-product-short-description'
    );
    const alertstockWarnEl = cardEl.querySelector('.alert-stock-warn');
    const idEl = cardEl.querySelector('.card-product-id');
    const buttonCloseEl = cardEl.querySelector('.button-card-close');

    codeEl.textContent = code;
    taglineEl.textContent = tagline;
    priceEl.textContent = price;
    quantityEl.textContent = quantity;
    shortDescriptionEl.textContent = shortDescription;
    idEl.textContent = _id;

    if (stockWarn) {
      alertstockWarnEl.classList.remove('d-none');
    }

    const currentEl = DOM.products.querySelector(`.product[data-id="${_id}"]`);

    buttonCloseEl.addEventListener('click', onClickCardClose);

    insertAfter(currentEl, cardEl);
  };

  const insertAfter = (referenceNode, newNode) => {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  };

  return {
    init,
    getProducts,
    getProductById,
    createProductsEls,
  };
};

export default ProductManager;
