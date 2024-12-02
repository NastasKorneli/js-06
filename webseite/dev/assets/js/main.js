'use strict';

import $ from 'jquery'; // Import aus node_modules durch Angabe von Modulnamen funktioniert nur mit einem JS-Bundler (esbuild, rollup, webpack, browserify)
import _ from 'lodash';

(() => {
  // === DOM & VARS =======
  const DOM = {};

  // === INIT =============
  const init = () => {
    $('body').css({ backgroundColor: '#efefef' });
    console.log(_.shuffle(_.range(0, 10)));
  };

  // === EVENTHANDLER =====

  // === XHR/FETCH ========

  // === FUNCTIONS ========

  init();
})();
