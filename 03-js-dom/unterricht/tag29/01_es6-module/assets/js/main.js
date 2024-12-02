'use strict';

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import

import Fn from './modules/Example.js';
import { Example, Example2, DEFAULT_LANG } from './modules/Examples.js';
import MyObject from './modules/Examples.js';
// Dateieindung muss in der ES6 Schreibweise (2018) gesetzt werden.

import 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js';

(() => {
  // === DOM & VARS =======
  const DOM = {};

  // === INIT =============
  const init = () => {
    console.log('init');
    Fn();
    Example();
    Example2();

    console.log(_.shuffle([1, 2, 3]));

    console.log(DEFAULT_LANG); // => 'de'
    MyObject.methode();
    MyObject.methode2();
    MyObject.methode3();
    console.log(MyObject.eigenschaft); // => 'wert'
    console.log(MyObject.example3); // => 'Testwert'
  };

  // === EVENTHANDLER =====

  // === XHR/FETCH ========

  // === FUNCTIONS ========

  init();
})();
