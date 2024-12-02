'use strict';

(() => {
  // === DOM & VARS ===
  const DOM = {};

  DOM.starshipsEl = document.querySelector('.starships');
  DOM.templateShipCard = document.querySelector('.template-ship-card');

  const SWAPI_API_STARSHIPS = 'https://swapi.dev/api/starships/';

  // === INIT =========

  const init = () => {
    getAllStarships(SWAPI_API_STARSHIPS);
  };

  // === EVENTS / XHR =======
  const getAllStarships = (starShipLink) => {
    fetch(starShipLink)
      .then((res) => {
        // console.log(res);
        return res.json();
      })
      .then((data) => generateStarships(data.results)) //console.log(data.results))
      .catch((err) => console.error(err));
  };
  // === FUNCTIONS ====

  const generateStarships = (data) => {
    data.forEach((ship) => {
      createStarshipCard(ship);
    });
  };

  const createStarshipCard = (data) => {
    const {
      name,
      model,
      manufacturer,
      cost_in_credits: costInCredits,
      length,
    } = data;

    const cardEl = DOM.templateShipCard.content.cloneNode(true);

    // console.log(name, model, manufacturer, costInCredits, length);

    cardEl.querySelector('.ship-name').textContent = name;
    cardEl.querySelector('.ship-model').textContent = model;
    cardEl.querySelector('.ship-manufacturer').textContent = manufacturer;
    cardEl.querySelector('.cost-in-credits').textContent = costInCredits;
    cardEl.querySelector('.ship-length').textContent = length;

    DOM.starshipsEl.appendChild(cardEl);
  };

  init();
})();
