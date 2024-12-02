'use strict';
(() => {
  // === DOM & VARS =======
  const DOM = {};
  DOM.tabs = document.querySelector('.tabs');

  DOM.tabItems = Array.from(DOM.tabs.querySelectorAll('nav ul li'));
  DOM.articles = Array.from(DOM.tabs.querySelectorAll('article'));

  // === INIT =============
  const init = () => {
    // Alle Artikel bis auf den ersten ausblenden
    DOM.articles.forEach((article, index) => {
      if (index !== 0) {
        article.style.display = 'none';
      }
    });

    // Dem ersten Tab die Klasse "active" hinzufügen
    DOM.tabItems[0].classList.add('active');

    // Eventhandler für die Tabs setzen
    DOM.tabItems.forEach((tab, index) => {
      // tab.addEventListener('click', (e) => handleTabClick(e, index)); // index wird vom Schleifendurchlauf mitgegeben
      tab.addEventListener('click', handleTabClick);
    });
  };

  // === EVENTHANDLER =====
  const handleTabClick = (e) => {
    const liEl = e.currentTarget;
    const index = DOM.tabItems.indexOf(liEl);
    // Alle Artikel ausblenden und alle Tabs als inaktiv markieren
    DOM.articles.forEach((article) => (article.style.display = 'none'));
    DOM.tabItems.forEach((tab) => tab.classList.remove('active'));

    // Ausgewählten Artikel anzeigen und Tab als aktiv markieren
    DOM.articles[index].style.display = 'block';
    DOM.tabItems[index].classList.add('active');
  };

  // === EXECUTE INIT ====
  init();
})();
// Übung 15: TABula Rasa
// Einer Ihrer Kunden ist ein Schulungsunternehmen. Der Akademieleiter wünscht sich, dass die Beschreibungsseiten der Seminare etwas übersichtlicher dargestellt werden. Daher sollen die Seminarübersichtsseiten in Zukunft über Reiter (Tabs) verfügen, sodass Besucher zwischen den Bereichen

// - Überblick,
// - Themen,
// - Lernziele und
// - Termine
// hin- und herschalten können.

// Eine HTML-Vorlage (inkl. CSS) hat er bereits von einer Agentur erstellen lassen. Ihre Aufgabe besteht darin, den JS-Code zu ergänzen.
// Folgende Features müssen Sie dafür implementieren:

// - Nach dem Laden müssen alle article-Elemente bis auf das erste versteckt sein.
// - Beim Klicken auf ein li-Element soll das zugehörige article-Element aktiv (d.h sichtbar) werden und alle anderen inaktiv.
// - Um zu sehen, welcher Tab gerade aktiv ist, darf außerdem nur das li-Element des gerade sichtbaren Tabs die CSS-Klasse active haben.
