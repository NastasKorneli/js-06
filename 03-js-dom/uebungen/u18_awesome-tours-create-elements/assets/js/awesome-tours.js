'use strict';

(() => {
  const $ = (qs) => document.querySelector(qs);
  const $$ = (qs) => Array.from(document.querySelectorAll(qs));

  // === DOM & VARS =======
  const DOM = {};
  DOM.module = document.querySelector('.m-tours');
  DOM.img = $$('.m-tours img');
  // DOM.info = $('#info p');
  // DOM.h3 = $('#info h3');
  // DOM.flag = $('#info img');
  DOM.infoBox = $('#info');

  console.log(DOM);

  // === INIT =============
  const init = () => {
    // console.log('init');
    DOM.infoBox.dataset.content = DOM.infoBox.innerHTML.trim();
    // EventListeners
    DOM.img.forEach((el) => {
      el.style.cursor = 'help';
      el.addEventListener('mouseover', onMouseOverImg);
    });
    DOM.module.addEventListener('mouseleave', onMouseLeaveImg);
  };
  // === EVENTHANDLER =====
  const onMouseLeaveImg = (e) => {
    DOM.infoBox.innerHTML = DOM.infoBox.dataset.content;
  };

  const onMouseOverImg = (e) => {
    const imgEl = e.target;
    const countryDescription = imgEl.dataset.description;
    const tourTitle = imgEl.alt;
    const flagName = imgEl.dataset.flagName;
    const countryCode = imgEl.dataset.countryCode;

    const headingEl = document.createElement('h3');
    const flagImg = document.createElement('img');
    const descriptionEl = document.createElement('p');
    const spanTitleEl = document.createElement('span');

    DOM.infoBox.innerHTML = '';

    flagImg.src = `assets/img/${countryCode}.svg`;
    flagImg.alt = flagImg.title = `${flagName} Flag`;

    spanTitleEl.textContent = tourTitle;
    descriptionEl.textContent = countryDescription;

    console.log(flagImg);

    headingEl.appendChild(flagImg);
    headingEl.appendChild(spanTitleEl);
    //headingEl.innerHTML += ` ${tourTitle}`;

    DOM.infoBox.appendChild(headingEl);
    DOM.infoBox.appendChild(descriptionEl);
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
