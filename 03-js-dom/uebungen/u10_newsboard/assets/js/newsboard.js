'use strict';

(() => {
  // === DOM & VARS =======
  const DOM = {};
  DOM.newsboard = document.querySelector('.newsboard');
  DOM.content = DOM.newsboard.querySelector('.newsboard_content');

  DOM.btnPrev = DOM.newsboard.querySelector('button[title="prev"]');
  DOM.btnNext = DOM.newsboard.querySelector('button[title="next"]');

  DOM.btnFirst = DOM.newsboard.querySelector('button[title="first"]'); // A1
  DOM.btnLast = DOM.newsboard.querySelector('button[title="last"]'); // A1

  DOM.spanMessageNumber = DOM.newsboard.querySelector('.message_number'); // A2

  let currentMessageNumber = 1;

  // console.log(DOM);

  // === INIT =============
  const init = () => {
    // Funktionsaufrufe
    showFirstMessage();
    showMessageTotalAmount(); //A2

    // EventListener
    DOM.btnPrev.addEventListener('click', onClickPrev);
    DOM.btnNext.addEventListener('click', onClickNext);
    DOM.btnFirst.addEventListener('click', onClickFirst); // A1
    DOM.btnLast.addEventListener('click', onClickLast); // A1
    document.addEventListener('keyup', onKeyUp);
  };

  // === EVENTHANDLER =====
  const onKeyUp = (e) => {
    console.log(e.key);
    // A3

    if (e.key === 'ArrowLeft') {
      onClickPrev();
    } else if (e.key === 'ArrowRight') {
      onClickNext();
    }
    // A4
    if (e.altKey && e.key === 'ArrowLeft') {
      onClickFirst();
    } else if (e.altKey && e.key === 'ArrowRight') {
      onClickLast();
    }
  };

  const onClickPrev = (e) => {
    showMessageByNumber(--currentMessageNumber);
  };
  const onClickNext = (e) => {
    showMessageByNumber(++currentMessageNumber);
  };

  const onClickFirst = (e) => {
    currentMessageNumber = 1;
    showMessageByNumber(currentMessageNumber); // A1
  };

  const onClickLast = (e) => {
    currentMessageNumber = MESSAGES.length;
    showMessageByNumber(currentMessageNumber); // A1
  };

  // === XHR/FETCH ========

  // === FUNCTIONS ========
  const showMessageByNumber = (nr) => {
    DOM.content.innerHTML = MESSAGES[nr - 1];
  };

  const showFirstMessage = () => {
    showMessageByNumber(1);
  };

  const showMessageTotalAmount = () => {
    const messageTotalAmount = MESSAGES.length;
    DOM.spanMessageNumber.textContent = messageTotalAmount;
  };

  init();
})();

// Übung 10: Newsboard: Das geht noch besser
// Das Newsboard wartet noch auf das Vervollständigen seiner Funktionen.

// 1 Belege die Links » und « mit Funktionalität. Der Link mit der Aufschrift « soll es erlauben, zur ersten Nachricht zu springen, der Link » zur letzten.

// 2 Der bisher eher sinnlose rote Kreis in der linken oberen Ecke soll nun die Gesamtanzahl der Nachrichten anzeigen. Schreibe eine Funktion, die diese Anzahl ausliest und in das <span> mit der Klasse message_number einträgt.

// 3 Unterstütze ab sofort das Navigieren durch die News mit der Tastatur. Die Pfeiltasten nach links und rechts sollen dabei jeweils die gleiche Funktionalität wie die Buttons < und > ermöglichen.

// 4 Auch das Springen auf die erste bzw. letzte Position soll nun mit Tastatur möglich sein. Die Tastenkombination dafür ist alt und die Pfeiltaste nach links (zur ersten Nachricht) bzw. rechts (zur letzten Nachricht).
