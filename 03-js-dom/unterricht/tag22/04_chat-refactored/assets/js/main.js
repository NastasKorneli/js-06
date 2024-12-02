'use strict';

// IIFE
(() => {
  const $ = (qs) => document.querySelector(qs);
  const $$ = (qs) => Array.from(document.querySelectorAll(qs));

  // === DOM & VARS =======
  const DOM = {};
  DOM.listItems = $$('#chat_members li');
  // const listItemEls = $$('#chat_members li'); //  Array.from(document.querySelectorAll('#chat_members li'));

  // === INIT =============
  const init = () => {
    highlightChatMembersBy('ert');
  };

  // === EVENTHANDLER =====

  // === XHR/FETCH ========

  // === FUNCTIONS ========
  const highlightChatMembersBy = (searchStr) => {
    const filteredListItems = DOM.listItems.filter((el) => {
      return el.textContent.toLowerCase().includes(searchStr.toLowerCase());
    });

    filteredListItems.forEach((el) => {
      el.classList.add('highlighted');
    });
  };

  init();
})();
