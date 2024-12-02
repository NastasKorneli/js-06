'use strict';

(() => {
  const $ = (qs) => document.querySelector(qs);
  const $$ = (qs) => Array.from(document.querySelectorAll(qs));

  // === DOM & VARS =======
  const DOM = {};
  DOM.newsboardContent = $('.newsboard_content');
  DOM.btnNext = $('.button-next');
  DOM.btnPrev = $('.button-prev');

  let currentMessageNumber = 1;

  // === INIT =============
  const init = () => {
    // Funktionsaufrufe
    showMessageByNumber(currentMessageNumber);

    // Events Listener
    DOM.btnNext.addEventListener('click', onClickNext);
    DOM.btnPrev.addEventListener('click', onClickPrev);

    window.addEventListener('keyup', onKeyUp);
  };

  // === EVENTHANDLER =====
  const onKeyUp = (e) => {
    // TODO 10.3 & 10.4
  };

  const onClickNext = (e) => {
    showMessageByNumber(++currentMessageNumber);
    console.log('next');
  };
  const onClickPrev = (e) => {
    showMessageByNumber(--currentMessageNumber);
    console.log('prevs');
  };
  // === XHR/FETCH ========

  // === FUNCTIONS ========
  const showMessageByNumber = (n) => {
    DOM.newsboardContent.innerHTML = MESSAGES[n - 1];
  };

  init();
})();
