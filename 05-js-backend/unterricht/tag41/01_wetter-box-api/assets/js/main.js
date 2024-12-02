'use strict';

(() => {
  // === DOM & VARS =======
  const DOM = {};
  DOM.module = document.querySelector('.m-weather-box');
  DOM.weatherIcon = DOM.module.querySelector('img');
  DOM.figCaption = DOM.module.querySelector('figcaption');
  DOM.description = DOM.module.querySelector('.description');
  DOM.temp = DOM.module.querySelector('.temp');
  DOM.tempMin = DOM.module.querySelector('.temp-min');
  DOM.tempMax = DOM.module.querySelector('.temp-max');
  DOM.tempMax = DOM.module.querySelector('.temp-max');
  DOM.windIcon = DOM.module.querySelector('.fa-compass');
  DOM.speed = DOM.module.querySelector('.speed');
  DOM.deg = DOM.module.querySelector('.deg');
  DOM.location = DOM.module.querySelector('.location');

  const API_KEY = 'b62eaccfd1a09cf1d04b00bd2ec689e7'; // Bitte eigenen Key von OpenWeather nutzen
  const LAT = 50.153574;
  const LONG = 8.659;

  console.log(DOM);

  // === INIT =============
  const init = () => {
    console.log('init');

    getWeather().then((data) => {
      console.log(data);
      setWeather(data);
    });
  };

  // === EVENTHANDLER =====

  // === XHR/FETCH ========
  const getWeather = async () => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LONG}&appid=${API_KEY}&lang=de&units=metric`
      );
      const data = await res.json();
      return data;
    } catch (error) {
      console.error('Something went wrong:', error);
    }
  };

  // === FUNCTIONS ========
  const setWeather = (data) => {
    DOM.module.classList.add('loaded'); // Wenn information vorliegt, dann anzeigen.

    DOM.figCaption.textContent = data.weather[0].main;
    DOM.description.textContent = data.weather[0].description;
    DOM.temp.textContent = data.main.temp.toFixed();
    DOM.tempMin.textContent = data.main.temp_min.toFixed();
    DOM.tempMax.textContent = data.main.temp_max.toFixed();
    DOM.speed.textContent = `${(data.wind.speed * 3.6).toFixed(2)} km/h`;
    DOM.deg.textContent = `${data.wind.deg.toFixed(2)} °`;

    DOM.location.textContent = data.name;

    DOM.weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    DOM.windIcon.style.transform = `rotate(${Number(data.wind.deg - 45)}deg)`;
  };

  init();
})();
