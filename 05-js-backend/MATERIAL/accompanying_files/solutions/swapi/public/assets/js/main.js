'use strict';

(() => {
  // === DOM & VARS ===
  const DOM = {};

  DOM.planets = document.querySelector('.star-wars-planets');

  const SWAPI_API_PLANETS =
    'https://swapi.api.webmasters-akademie.dev/planets/';

  // === INIT =========

  const init = () => {
    getAllPlanets();
  };

  // === EVENTS / XHR =======
  const getAllPlanets = () => {
    fetch(SWAPI_API_PLANETS)
      .then((res) => {
        // console.log(res);
        return res.json();
      })
      .then((data) => generatePlanets(data)) //console.log(data.results))
      .catch((err) => console.error(err));
  };
  // === FUNCTIONS ====

  const generatePlanets = (data) => {
    DOM.planets.innerHTML = '';
    DOM.planets.innerHTML += '<p>60 planets loaded:</p>';
    DOM.planets.innerHTML += `<p>${data
      .map((planet) => planet.name)
      .join(', ')}</p>`;
  };

  init();
})();
