'use strict';

(() => {
  const $ = (qs) => document.querySelector(qs);
  const $$ = (qs) => Array.from(document.querySelectorAll(qs));

  // === DOM & VARS =======
  const SMALL = 14;
  const NORMAL = 16;
  const BIG = 24;
  const VERY_BIG = 36;

  const DOM = {};
  // DOM.btnVeryBig = $('.button-very-big');
  // DOM.btnBig = $('.button-big');
  // DOM.btnNormal = $('.button-normal');
  // DOM.btnSmall = $('.button-small');

  DOM.btns = $$('.button-controls button');

  DOM.text = $('p');

  console.log(DOM);

  // === INIT =============
  const init = () => {
    DOM.text.style.fontSize = getComputedStyle(DOM.text).fontSize; // => <p style="font-size: 16px"></p>

    console.log('init');

    // EventListener
    // DOM.btnVeryBig.addEventListener('click', onClickVeryBig);
    // DOM.btnBig.addEventListener('click', onClickBig);
    // DOM.btnNormal.addEventListener('click', onClickNormal);
    // DOM.btnSmall.addEventListener('click', onClickSmall);

    DOM.btns.forEach((el) => {
      el.addEventListener('click', onClickFontSize);
    });

    // $on(DOM.btns, 'click', onClickFontSize);
  };

  // === EVENTHANDLER =====
  const onClickFontSize = (e) => {
    const btnEl = e.currentTarget;
    const id = btnEl.getAttribute('data-id'); // btnEl.dataset.id

    // setFontSizeTo(eval(id));

    switch (id) {
      case 'VERY_BIG':
      case 'BIG':
      case 'NORMAL':
      case 'SMALL':
        setFontSizeTo(eval(id));
        break;
      case 'INCREASE':
        setFontSizeTo(getCurrentFontSize() + 5);
        break;
      case 'DECREASE':
        setFontSizeTo(getCurrentFontSize() - 5);
        break;
      default:
        console.warn('No font-size data');
    }

    // switch (id) {
    //   case 'VERY_BIG':
    //     setFontSizeTo(VERY_BIG);
    //     break;
    //   case 'BIG':
    //     setFontSizeTo(BIG);
    //     break;
    //   case 'NORMAL':
    //     setFontSizeTo(NORMAL);
    //     break;
    //   case 'SMALL':
    //     setFontSizeTo(SMALL);
    //     break;
    //   case 'INCREASE':
    //     setFontSizeTo(getCurrentFontSize() + 5);
    //     break;
    //   case 'DECREASE':
    //     setFontSizeTo(getCurrentFontSize() - 5);
    //     break;
    //   default:
    //     console.warn('No font-size data');
    // }

    // if (id === 'VERY_BIG') {
    //   setFontSizeTo(VERY_BIG);
    // }
    // if (id === 'BIG') {
    //   setFontSizeTo(BIG);
    // }
    // if (id === 'NORMAL') {
    //   setFontSizeTo(NORMAL);
    // }
    // if (id === 'SMALL') {
    //   setFontSizeTo(SMALL);
    // }
    // if (id === 'INCREASE') {
    //   setFontSizeTo(getCurrentFontSize() + 5);
    // }
    // if (id === 'DECREASE') {
    //   setFontSizeTo(getCurrentFontSize() - 5);
    // }
  };

  // const onClickVeryBig = (e) => {
  //   setFontSizeTo(VERY_BIG);
  // };
  // const onClickBig = (e) => {
  //   setFontSizeTo(BIG);
  // };
  // const onClickNormal = (e) => {
  //   setFontSizeTo(NORMAL);
  // };
  // const onClickSmall = (e) => {
  //   setFontSizeTo(SMALL);
  // };
  // === XHR/FETCH ========

  // === FUNCTIONS ========
  const getCurrentFontSize = () => {
    return parseInt(DOM.text.style.fontSize); // parseInt('16px') -> 16
    // return parseInt(getComputedStyle(DOM.text).fontSize); // parseInt('16px') -> 16
  };

  const setFontSizeTo = (size) => {
    DOM.text.style.fontSize = `${size}px`;
  };

  init();
})();
