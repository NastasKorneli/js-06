'use strict';

// IIFE
(() => {
  const $ = (qs) => document.querySelector(qs);
  const $$ = (qs) => Array.from(document.querySelectorAll(qs));

  // === DOM & VARS =======
  const DOM = {};
  DOM.listItems = $$('#chat_members li');
  DOM.inputSearch = $('#member_search input');

  // const listItemEls = $$('#chat_members li'); //  Array.from(document.querySelectorAll('#chat_members li'));

  // === INIT =============
  const init = () => {
    DOM.inputSearch.addEventListener('keyup', onKeyUpInputSearch);
  };

  // === EVENTHANDLER =====
  const onKeyUpInputSearch = (e) => {
    highlightChatMembersBy(e.target.value);
  };
  // === XHR/FETCH ========

  // === FUNCTIONS ========
  const highlightChatMembersBy = (searchStr) => {
    DOM.listItems.forEach((el) => {
      el.classList.remove('highlighted');
      if (searchStr !== '' && el.textContent.toLowerCase().includes(searchStr.toLowerCase())) {
        el.classList.add('highlighted');
      }
    });

    // DOM.listItems.forEach((el) => el.classList.remove('highlighted'));
    // // Guard
    // if (searchStr === '') return;

    // const filteredListItems = DOM.listItems.filter((el) => {
    //   return el.textContent.toLowerCase().includes(searchStr.toLowerCase());
    // });

    // filteredListItems.forEach((el) => {
    //   el.classList.add('highlighted');
    // });
  };

  init();
})();
