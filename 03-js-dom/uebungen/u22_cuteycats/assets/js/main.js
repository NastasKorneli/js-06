'use strict';
(() => {
  const $ = (qs) => document.querySelector(qs);
  const $$ = (qs) => Array.from(document.querySelectorAll(qs));

  // === DOM & VARS =======
  const DOM = {};
  DOM.catList = $('.box-cat-vote ul.list-cat-vote');
  DOM.catListItems = $$('ul.list-cat-vote li');
  // DOM.catListImages = $$('ul.list-cat-vote li img');
  DOM.catListSelection = $('ul.list-cat-selection');
  DOM.catListSelectionLi = $$('ul.list-cat-selection li');

  console.log(DOM);

  // === INIT =============
  const init = () => {
    // Event Listeners
    DOM.catListItems.forEach((el) => {
      el.addEventListener('click', onClickCloneListItem);
    });
  };

  // === EVENTHANDLER =====
  const onClickCloneListItem = (e) => {
    const listItem = e.currentTarget;

    // Guard
    if (DOM.catListSelection.children.length >= 3 || isCatInSelection(listItem)) {
      //  DOM.catList.style.pointerEvents = 'none';
      return;
    }

    const cloneListItem = listItem.cloneNode(true);
    cloneListItem.addEventListener('click', onClickRemoveListItem);

    DOM.catListSelection.appendChild(cloneListItem);
  };

  const onClickRemoveListItem = (e) => {
    e.currentTarget.remove();
  };

  // === XHR/FETCH ========

  // === FUNCTIONS ========
  const isCatInSelection = (listItem) => {
    const foundCat = Array.from(DOM.catListSelection.children).find((el) => {
      const img = el.querySelector('img');
      const imgSelection = listItem.querySelector('img');

      // if (img.src === imgSelection.src) {
      //   return true;
      // } else {
      //   return false
      // }

      return img.src === imgSelection.src;
    });
    return foundCat ? true : false;
  };

  init();
})();
