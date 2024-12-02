'use strict';

(() => {
  const $ = (qs) => document.querySelector(qs);
  const $$ = (qs) => Array.from(document.querySelectorAll(qs));

  // === DOM & VARS =======
  const DOM = {};
  DOM.img = $$('.m-tours img');

  DOM.p = $('#info p');
  DOM.h3 = $('#info h3');
  DOM.flag = $('#info img');

  DOM.infoBox = $('#info');

  console.log(DOM);

  // === INIT =============
  const init = () => {
    // console.log('init');

    // EventListeners
    DOM.img.forEach((el) => {
      el.addEventListener('mouseover', onMouseOverImg);
    });
  };

  // === EVENTHANDLER =====
  const onMouseOverImg = (e) => {
    const imgEl = e.target;
    const countryDesciption = imgEl.dataset.description;
    const tourTitle = imgEl.alt;
    const countryFlag = imgEl.dataset.countryCode;
    const flagName = imgEl.dataset.flagName;

    // DOM.h3.innerHTML = `<img src="assets/img/${countryFlag}.svg"/> ${tourTitle}`;
    // DOM.p.textContent = countryDesciption;

    DOM.infoBox.innerHTML = `<h3>
        <img src="assets/img/${countryFlag}.svg" alt="${flagName}" title="${flagName}">
        ${tourTitle}
    </h3>
    <p>
      ${countryDesciption}
    </p>`;
  };

  // === XHR/FETCH ========

  // === FUNCTIONS ========

  init();
})();

// Übung 18: awesome tours

// Das Reiseunternehmen awesome tours bietet Rundreisen zu verschiedenen Sehenswürdigkeiten in Europa an. Im Zuge eines Rebuilds der Website möchte das Unternehmen die Darstellung der Sehenswürdigkeiten ebenfalls modernisieren. Das Design inklusive HTML- und CSS-Code hat bereits eine Agentur übernommen.

// Die Informationen zu den Sehenswürdigkeiten (Name, Beschreibung, Land usw.) sind dabei bereits im HTML-Code hinterlegt. Ihre Aufgabe ist es nun, beim Mouseenter eine Darstellung wie in Abb. 29 zu ermöglichen.

// Dazu gehört folgende Anzeige:

// - Name der Sehenswürdigkeit
// - Beschreibung
// - Landesflagge als Bild

// Das HTML zur Anzeige der Eiffelturm-Infos könnte beispielsweise so aussehen:

/*
<section id="info">
  <h3>
      <img src="assets/img/it.png" alt="Italian Flag" title="Italian Flag">
      Colosseum
  </h3>
  <p>
    The Colosseum or Coliseum, also known as the Flavian Amphitheatre or Colosseo, is an oval amphitheatre in...
  </p>
</section>
 
 
*/
