'use strict';

(() => {
  // === DOM & VARS =======
  const DOM = {};

  const API_KEY = 'b62eaccfd1a09cf1d04b00bd2ec689e7'; // BITTE EIGENEN KEY VERWENDEN
  const LAT = 50.15357;
  const LONG = 8.659;

  // https://www.latlong.net/
  // === INIT =============
  const init = () => {
    getWeather();
  };

  // === EVENTHANDLER =====

  // === XHR/FETCH ========
  const getWeather = () => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LONG}&appid=${API_KEY}&units=metric`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.error(err));
  };

  // === FUNCTIONS ========

  init();
})();
