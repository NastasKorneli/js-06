'use strict';

(() => {
  // === DOM & VARS =======
  const DOM = {};
  DOM.lightBulbs = Array.from(document.querySelectorAll('.light-bulbs img'));

  let activeIndex = 0;

  // === INIT =============
  const init = () => {
    updateLights(); // Alle Lichter ausschalten und erstes Licht aktivieren
    addEventListeners();
  };

  // === EVENTHANDLER =====
  const addEventListeners = () => {
    DOM.lightBulbs.forEach((bulb, index) => {
      //bulb.addEventListener('mouseover', (e) => handleLightChase(e, index));
      bulb.addEventListener('mouseover', handleLightChase);
      bulb.addEventListener('click', handleLightChase);
    });
  };

  // const handleLightChase = (e, index) => {
  const handleLightChase = (e) => {
    const imgEl = e.currentTarget;
    const index = DOM.lightBulbs.indexOf(imgEl);
    const nextIndex = activeIndex + 1;

    if (index === activeIndex) {
      activeIndex = nextIndex === DOM.lightBulbs.length ? 0 : nextIndex; // (nextIndex) % DOM.lightBulbs.length;
      updateLights();
    }
  };

  // === XHR/FETCH ========

  // === FUNCTIONS ========
  const updateLights = () => {
    DOM.lightBulbs.forEach((bulb) => {
      bulb.src = 'assets/img/light_off.png';
    });
    DOM.lightBulbs[activeIndex].src = 'assets/img/light_on.png';
  };

  init();
})();
// Übung 13: Die Rückkehr der Lauflichter: Teil 1 - Chasing Lights

// Lichterketten waren einmal der letzte Schrei (und sind es um Weihnachten oft immer noch). Manche verfügen sogar über Lauflicht-Funktion. Genauso eine könntest du jetzt programmieren. Die folgende, einfache HTML-Vorlage findest du auch im Übungsmaterial:

// Eine erste Variante sind die chasing Lights. Dabei muss der Anwender das Lauflicht mit der Maus »jagen«. Immer wenn der Mauszeiger sich über einer Glühbirne befindet, schaltet sich die nächste Birne ein und die aktuelle aus. Versucht der Benutzer, mit dem Mauszeiger die leuchtende Glühbirne zu berühren, springt das Licht auf die nächste über. Er »jagt« quasi das Lauflicht. Bei der letzten Lampe beginnt das Spiel wieder von vorn!

// 2Programmiere ein weiteres Lauflicht. Diesmal soll das Lauflicht weiterspringen, wenn der Benutzer auf eine der Lampen klickt. Auch hier gilt: Nach der letzten Lampe fängt das Licht wieder von vorn an zu laufen.
