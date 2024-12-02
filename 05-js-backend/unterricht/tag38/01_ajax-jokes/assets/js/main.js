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
    // getJoke();
    getJokeXhr();
    // getJokeJQuery();
    DOM.btnGenerateJoke.addEventListener('click', onClickCreateJoke);
  };

  // === EVENTHANDLER =====
  const onClickCreateJoke = (e) => {
    getJoke();
  };

  // === XHR/FETCH ========
  const getJokeXhr = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.chucknorris.io/jokes/random');
    xhr.send();

    xhr.addEventListener('readystatechange', (e) => {
      // 0	UNSENT	Client has been created. open() not called yet.
      // 1	OPENED	open() has been called.
      // 2	HEADERS_RECEIVED	send() has been called, and headers and status are available.
      // 3	LOADING	Downloading; responseText holds partial data.
      // 4	DONE	The operation is complete.
      console.log(xhr.readyState);

      if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 304)) {
        const data = JSON.parse(xhr.responseText);
        createJoke(data.value);
      }
    });
  };

  const getJoke = () => {
    fetch('https://api.chucknorris.io/jokes/random')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        createJoke(data.value);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getJokeJQuery = () => {
    $.getJSON('https://api.chucknorris.io/jokes/random', (data) => {
      createJoke(data.value);
    });

    // $.ajax({
    //   url: 'https://api.chucknorris.io/jokes/random',
    //   type: 'GET',
    //   success: (data) => {
    //     createJoke(data.value);
    //   },
    //   error: (error) => {
    //     console.log(error);
    //   },
    // });
  };

  // === FUNCTIONS ========
  const createJoke = (joke = '') => {
    DOM.quote.textContent = joke;
  };

  init();
})();
