'use strict';

(() => {
  // === DOM & VARS =======
  const DOM = {};
  DOM.newsboard = document.querySelector('.m-newsboard');
  DOM.newsboardContent = DOM.newsboard.querySelector('.newsboard_content');
  DOM.buttonPrev = DOM.newsboard.querySelector('button[title="prev"]');
  DOM.buttonNext = DOM.newsboard.querySelector('button[title="next"]');

  DOM.buttonFirst = DOM.newsboard.querySelector('button[title="first"]');
  DOM.buttonLast = DOM.newsboard.querySelector('button[title="last"]');

  DOM.progressbar = DOM.newsboard.querySelector('.progressbar progress');

  // 10.2
  DOM.totalMsgAmount = DOM.newsboard.querySelector('.message_number');

  // let currentMessageNumber = 1;

  console.log(DOM);

  // === INIT =============
  const init = () => {
    initProgressbar();
    showFirstMessage();
    showTotalAmount();

    disableNonFunctionalBtns();

    DOM.buttonNext.addEventListener('click', onClickNext);
    DOM.buttonPrev.addEventListener('click', onClickPrev);

    // 10.1
    DOM.buttonFirst.addEventListener('click', onClickFirst);
    DOM.buttonLast.addEventListener('click', onClickLast);

    // 10.3
    window.addEventListener('keyup', onKeyUp);
  };

  // === EVENTHANDLER =====
  // 10.1
  const onClickLast = (e) => {
    lastMessage();
    disableNonFunctionalBtns();
  };

  const onClickNext = (e) => {
    // GUARD
    if (DOM.progressbar.value === MESSAGES.length) return;

    // showMessageByNumber(++currentMessageNumber);
    showMessageByNumber(incCurrentMessageNumber());
    console.log('click');
    disableNonFunctionalBtns();
  };

  // 10.1
  const onClickFirst = (e) => {
    firstMessage();
    disableNonFunctionalBtns();
  };

  const onClickPrev = (e) => {
    // GUARD
    if (DOM.progressbar.value === 1) return;

    // showMessageByNumber(--currentMessageNumber);
    showMessageByNumber(decCurrentMessageNumber());
    console.log('click');
    disableNonFunctionalBtns();
  };

  // 10.3
  const onKeyUp = (e) => {
    // console.log(e.code);
    // console.log(e.key);

    const key = e.code;
    const isAltKey = e.altKey;
    // Fallunterscheidung mit switch - case
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch?retiredLocale=de

    // switch (key) {
    //   case 'ArrowRight':
    //     isAltKey ? onClickLast() : onClickNext();
    //     break;
    //   case 'ArrowLeft':
    //     isAltKey ? onClickFirst() : onClickPrev();
    //     break;
    //   default:
    //     console.warn('Tastenkürzel nicht bekannt');
    // }

    // 10.3 & 10.4
    if (e.code === 'ArrowRight' && !e.altKey) {
      onClickNext();
    }
    if (e.code === 'ArrowRight' && e.altKey) {
      onClickLast();
    }
    if (e.code === 'ArrowLeft' && !e.altKey) {
      onClickPrev();
    }
    if (e.code === 'ArrowLeft' && e.altKey) {
      onClickFirst();
    }
  };

  // === XHR/FETCH ========

  // === FUNCTIONS ========
  const showMessageByNumber = (messageNumber) => {
    DOM.newsboardContent.innerHTML = MESSAGES[messageNumber - 1];
  };

  // 10.1
  const lastMessage = (e) => {
    // currentMessageNumber = MESSAGES.length;
    DOM.progressbar.value = MESSAGES.length;
    showMessageByNumber(DOM.progressbar.value);
  };

  // 10.1
  const firstMessage = () => {
    // currentMessageNumber = 1;
    DOM.progressbar.value = 1;
    showMessageByNumber(DOM.progressbar.value);
  };

  const showFirstMessage = () => {
    showMessageByNumber(1);
  };

  // 10.2 - Die Gesamtanzahl der Nachrichten anzeigen
  const showTotalAmount = () => {
    DOM.totalMsgAmount.innerHTML = MESSAGES.length;
  };

  const initProgressbar = () => {
    DOM.progressbar.value = 1;
    DOM.progressbar.max = MESSAGES.length;
  };

  const incCurrentMessageNumber = () => {
    // Der Wert vom Progress-Element wird um 1 erhöht und der erhöhte Wert wird zurückgegeben
    return (DOM.progressbar.value += 1);
  };
  const decCurrentMessageNumber = () => {
    // Der Wert vom Progress-Element wird um 1 verringert und der verringerte Wert wird zurückgegeben
    return (DOM.progressbar.value -= 1);
  };

  // 12.2 & 12.3
  const disableNonFunctionalBtns = () => {
    DOM.buttonFirst.disabled = DOM.buttonPrev.disabled = DOM.progressbar.value === 1; // => true || false wird dem disable-Attribut zugewiesen.
    DOM.buttonLast.disabled = DOM.buttonNext.disabled = DOM.progressbar.value === MESSAGES.length;
  };

  init();
})();

// Übung 12: Newsboard: Jetzt ist aber Schluss!

// Die neuen Features des Newsboards sind schon fast fertig. Problematisch ist aber, dass die Vorwärts- und Rückwärts-Buttons auch aktiv sind, wenn es keine vorige bzw. nächste Nachricht mehr gibt. Dies führt zu einem sehr unschönen Fehler.

// 1. Machen Sie die Links (a-Element), die der Steuerung der Newsboards dienen, zu echten Buttons (button-Element). Damit lassen sie sich im Bedarfsfall deaktivieren.

// 2. Sorgen Sie dafür, dass die Vor- und Rückwärts-Buttons jeweils deaktiviert werden, sobald der Anwender am Anfang bzw. Ende der Nachrichtenliste angekommen ist.

// 3. Auch die Buttons, die den Anwender zur ersten bzw. zur letzten Nachricht führen, sollen deaktiviert sein, sobald sich der Anwender bei der ersten bzw. letzten Nachricht befindet.

//=========

// Übung 10: Newsboard: Das geht noch besser
// Das Newsboard wartet noch auf das Vervollständigen seiner Funktionen.

// 1. Belegen Sie die Links » und « mit Funktionalität. Der Link mit der Aufschrift « soll es erlauben, zur ersten Nachricht zu springen, der Link » zur letzen.

// 2. Der bisher eher sinnlose rote Kreis in der linken oberen Ecke soll nun die Gesamtanzahl der Nachrichten anzeigen. Schreiben Sie eine Funktion, die diese Anzahl ausliest und in das <span> mit der Klasse message_number einträgt.

// 3. Unterstützen Sie ab sofort das Navigieren durch die News mit der Tastatur. Die Pfeiltasten nach links und rechts sollen dabei jeweils die gleiche Funktionalität wie die Buttons < und > ermöglichen.

// 4. Auch das Springen auf die erste bzw. letzte Position soll nun mit Tastatur möglich sein. Die Tastenkombination dafür ist alt und die Pfeiltaste nach links (zur ersten Nachricht) bzw. rechts (zur letzten Nachricht).
