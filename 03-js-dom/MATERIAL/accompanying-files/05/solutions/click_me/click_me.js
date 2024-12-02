'use strict';

{
  const init = () => $('#click_me').addEventListener('click', handleButtonClick);
  //  Alternative Variante:
  //  $on($("#click_me"), "click", handleButtonClick);

  const handleButtonClick = (event) =>
    changeButtonTextTo(
      event.target,
      event.altKey ? 'Cool, you found an easteregg!' : 'Hey I like it when you click me!'
    );

  const changeButtonTextTo = (button, text) => (button.innerHTML = text);

  const $ = (q) => document.querySelector(q);
  //  const $$ = q => Array.from(document.querySelectorAll(q));
  const $on = (el, ev, fn) => {
    Array.isArray(el) ? el.forEach((o) => $on(o, ev, fn)) : el.addEventListener(ev, fn);
    return el;
  };

  init();
}
