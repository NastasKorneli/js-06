'use strict';

(() => {
  // === DOM & VARS =======
  const DOM = {};
  DOM.stockInfo = document.querySelector('.stock-info');
  DOM.price = DOM.stockInfo.querySelector('.price');
  DOM.volume = DOM.stockInfo.querySelector('.volume');
  DOM.time = DOM.stockInfo.querySelector('.time');

  console.log(DOM);

  // === INIT =============
  const init = () => {
    console.log('init');
    getInfo();
  };

  // === EVENTHANDLER =====

  // === XHR/FETCH ========
  const getInfo = () => {
    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    fetch('/info')
      .then((res) => {
        console.log(res); // HTTP-Response
        return res.json(); // HTTP-Response Body wird in JavaScript Objekte geparsed (asynchroner Prozess)
      })
      .then((data) => {
        // console.log(data);
        createStockInfo(data);
      })
      .catch((err) => {
        console.error(err);
      });

    setTimeout(getInfo, 1000); // Rekursion
  };

  // === FUNCTIONS ========
  const createStockInfo = (stock) => {
    // destructuring vom stock-Objekt
    const { volume = 0, time = new Date().toLocaleTimeString(), price = 0 } = stock;

    DOM.price.textContent = Number(price).toFixed(2);
    DOM.time.textContent = time;
    DOM.volume.textContent = Number(volume).toFixed(2);
  };

  init();
})();
