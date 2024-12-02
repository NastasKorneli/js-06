'use strict';

(() => {
  const $ = (qs) => document.querySelector(qs);
  const $$ = (qs) => Array.from(document.querySelectorAll(qs));

  // === DOM & VARS =======
  const MOUSE_OFFSET_X = 20;
  const MOUSE_OFFSET_Y = 20;

  const DOM = {};
  DOM.keywords = $$('span.keyword');
  DOM.tooltip = $('#tooltip');

  console.log(DOM);

  // === INIT =============
  const init = () => {
    console.log('init');
    // EventListeners
    DOM.keywords.forEach((el) => {
      el.addEventListener('mousemove', onMouseMoveKeyword);
      el.addEventListener('mouseleave', onMouseLeaveKeyword);
    });
  };

  // === EVENTHANDLER =====
  const onMouseMoveKeyword = (e) => {
    const keywordEl = e.currentTarget;
    const description = keywordEl.dataset.tooltip || 'no description ';
    DOM.tooltip.style.left = `${e.clientX + MOUSE_OFFSET_X}px`;
    DOM.tooltip.style.top = `${e.clientY + MOUSE_OFFSET_Y}px`;

    DOM.tooltip.textContent = description;

    showTooltip();
  };

  const onMouseLeaveKeyword = (e) => {
    hideTooltip();
  };
  // === XHR/FETCH ========

  // === FUNCTIONS ========
  const showTooltip = () => {
    // DOM.tooltip.style.display = 'block';
    DOM.tooltip.classList.add('show');
    DOM.tooltip.classList.remove('hide');
  };

  const hideTooltip = () => {
    // DOM.tooltip.style.display = 'none';
    DOM.tooltip.classList.add('hide');
    DOM.tooltip.classList.remove('show');
  };

  init();
})();
