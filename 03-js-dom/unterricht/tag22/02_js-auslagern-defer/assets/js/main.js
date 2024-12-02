'use strict';

console.log('init');

const h1El = document.querySelector('h1');

console.log(h1El); // => h1 Element, wenn "defer" Attribut gesetzt wrude

const onLoaded = (e) => {
  const h1El = document.querySelector('h1');

  console.log(h1El); // => h1 Element

  h1El.style.backgroundColor = 'tomato';
};

// Event Lauscher - Es wird gewartet bis das Dokument fertig initialisiert wurde, entspricht dem "defer" - Attribut
document.addEventListener('DOMContentLoaded', onLoaded); // onLoaded ist eine Funktionsreferenz
