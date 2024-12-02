'use strict';

import ProductManager from './modules/ProductManager.js';
import Toast from './modules/Toast.js';

(() => {
  // === DOM & VARS =======
  const DOM = {};
  const productManager = ProductManager();
  const { getProducts, createProductsEls } = productManager;

  DOM.formLogin = document.querySelector('.form-login');
  DOM.inputUsername = DOM.formLogin.querySelector('input[name="username"]');
  DOM.inputPassword = DOM.formLogin.querySelector('input[name="password"]');
  DOM.buttonSignIn = DOM.formLogin.querySelector('.button-sign-in');

  DOM.menuMain = document.querySelector('.menu-main');
  DOM.buttonLogin = DOM.menuMain.querySelector('.button-login');
  DOM.buttonLogout = DOM.menuMain.querySelector('.button-logout');

  // Register
  DOM.formSignUp = document.querySelector('.form-sign-up');
  DOM.inputUsernameSignUp = DOM.formSignUp.querySelector(
    'input[name="username"]'
  );
  DOM.inputEmailSignUp = DOM.formSignUp.querySelector('input[name="email"]');
  DOM.inputPasswordSignUp = DOM.formSignUp.querySelector(
    'input[name="password"]'
  );
  DOM.inputPasswordConfirmSignUp = DOM.formSignUp.querySelector(
    'input[name="confirmPassword"]'
  );

  // === INIT =============
  const init = () => {
    productManager.init();

    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      DOM.buttonLogin.classList.add('d-none');
      DOM.buttonLogout.classList.remove('d-none');
    }

    DOM.buttonLogout.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('logout');
      localStorage.removeItem('user');
      localStorage.removeItem('token');

      window.location.reload();
    });

    DOM.formLogin.addEventListener('submit', onSubmitLogin);
    DOM.formSignUp.addEventListener('submit', onSubmitSignUp);
  };

  // === EVENTHANDLER =====
  const onSubmitSignUp = async (e) => {
    e.preventDefault();
    const user = {
      username: DOM.inputUsernameSignUp.value,
      email: DOM.inputEmailSignUp.value,
      password: DOM.inputPasswordSignUp.value,
      confirmPassword: DOM.inputPasswordConfirmSignUp.value,
    };

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!res.ok) {
        const error = await res.json();
        console.log(error);
        Toast({ text: error.msg, type: 'error', show: true });
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log(data);
      if (data) {
        Toast({ text: 'Registration successful', type: 'success', show: true });
        DOM.formSignUp.reset();
      }
    } catch (error) {
      console.error('ERROR', error);
    }
  };

  const onSubmitLogin = async (e) => {
    e.preventDefault();
    const user = {
      username: DOM.inputUsername.value,
      password: DOM.inputPassword.value,
    };

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!res.ok) {
        const error = await res.json();
        Toast({ text: error.msg, type: 'error', show: true });
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      if (data) {
        Toast({ text: 'Login successful', type: 'success', show: true });
        localStorage.setItem('user', JSON.stringify(data.others));
        localStorage.setItem('token', data.token);

        getProducts().then((products) => {
          createProductsEls(products);
        });
        DOM.buttonLogin.classList.add('d-none');
        DOM.buttonLogout.classList.remove('d-none');
      }
    } catch (error) {
      console.error('ERROR', error);
      Toast({ text: 'Login failed', type: 'error', show: true });
    }
  };

  // === XHR/FETCH ========

  // === FUNCTIONS ========

  init();
})();
