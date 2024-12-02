'use strict';

(() => {
  // === DOM & VARS =======
  const DOM = {};
  DOM.chuckJokes = document.querySelector('.chuck-jokes');
  DOM.quote = DOM.chuckJokes.querySelector('blockquote');
  DOM.btnGenerateJoke = DOM.chuckJokes.querySelector('.button-generate-joke');

  // console.log(DOM);

  // === INIT =============
  const init = () => {
    console.log('init');

    getJoke().then((data) => {
      createJoke(data.value);
    });
    DOM.btnGenerateJoke.addEventListener('click', onClickCreateJoke);
  };

  // const init = async () => {
  //   console.log('init');
  //   const data = await getJoke();
  //   createJoke(data.value);
  //   DOM.btnGenerateJoke.addEventListener('click', onClickCreateJoke);
  // };

  // === EVENTHANDLER =====
  const onClickCreateJoke = (e) => {
    getJoke().then((data) => {
      createJoke(data.value);
    });
  };

  // === XHR/FETCH ========

  // async await - Rückgabe der asynchronen Daten über Promise
  const getJoke = async () => {
    try {
      const res = await fetch('https://api.chucknorris.io/jokes/random');
      const data = await res.json(); // HTTP-Response Body stream wird async in JS-Objekt umgewandelt
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  // Promise-Objekt - Rückgabe der asynchronen Daten über Promise
  // const getJoke = () => {
  //   return new Promise((resolve, reject) => {
  //     fetch('https://api.chucknorris.io/jokes/random')
  //       .then((res) => {
  //         return res.json();
  //       })
  //       .then((data) => {
  //         console.log(data);
  //         resolve(data);
  //         // createJoke(data.value);
  //       })
  //       .catch((err) => {
  //         // reject(err)
  //         console.error(err);
  //       });
  //   });
  // };

  // === FUNCTIONS ========
  const createJoke = (joke = '') => {
    DOM.quote.textContent = joke;
  };

  init();
})();
