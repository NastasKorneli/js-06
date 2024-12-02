'use strict';

(() => {
  // === DOM & VARS =======
  const DOM = {};
  DOM.planets = document.querySelector('.planets');
  DOM.templateCard = DOM.planets.querySelector('.template-card');
  DOM.container = DOM.planets.querySelector('.container');
  DOM.row = DOM.container.querySelector('.row');
  // === INIT =============
  const init = () => {
    getPlanets().then((data) => {
      console.log(data);
      createPlanets(data.bodies);
    });
  };

  // === EVENTHANDLER =====

  // === XHR/FETCH ========
  const getPlanets = () => {
    return new Promise((resolve, reject) => {
      fetch('https://api.le-systeme-solaire.net/rest/bodies/?filter[]=isPlanet,eq,true&exclude=isPlanet,moons')
        .then((res) => {
          return res.json();
        })
        .then(resolve) // funktionsreferenz
        .catch((err) => {
          console.error(err);
        });
    });
  };

  // === FUNCTIONS ========
  const createPlanets = (planets) => {
    planets.forEach((planet, idx) => {
      const cardEl = DOM.templateCard.content.cloneNode(true);
      const titleEl = cardEl.querySelector('.card-title');

      titleEl.textContent = planet.englishName || planet.name;

      DOM.row.appendChild(cardEl);
    });
  };

  init();
})();

// https://solar.api.webmasters-akademie.dev/documentation
// https://api.le-systeme-solaire.net/en/

//  https://api.le-systeme-solaire.net/rest/bodies/?filter[]=isPlanet,eq,true&exclude=isPlanet,moons

// Übung 21: Unsere Planeten

// In dieser Übung wist du zum Weltraumforscher. Über die API Solar System kannst du dir allerlei interessante Daten zu den Himmelskörpern unseres Sonnensystems anzeigen lassen. Welche Daten diese API liefert und wie du diese ansprichst, kannst du der Dokumentation entnehmen.

// Deine Aufgabe ist, es eine Webseite zu entwickeln, auf der ein Besucher sich einen Planeten des Sonnensystems aussuchen kann. Zu dem ausgesuchten Planeten sollen dann mehrere Eigenschaften angezeigt werden. Schau dazu in der Dokumentation nach, welche Eigenschaften ein Planet hat, und suche dir mindestens vier der Eigenschaften aus.

// Nutze die fetch() Funktion, um die API anzusprechen. Denke auch an die korrekte Fehlerbehandlung.
