// Das Promise Objekt stellt eine Repräsentation einer eventuellen Ausführung (oder eines Fehlschlags) einer asynchronen Operation und den daraus resultierenden Ergebnissen dar.

// https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Promise

const promise = new Promise((resolve, reject) => {
  const ergebnis = 21 * 2; // simulierte async code logik

  // simuliertes callback
  if (ergebnis !== 42) {
    // error an reject
    reject(`Error: ${ergebnis} ist nicht korrekt`);
  } else {
    // data an resolve
    resolve(ergebnis);
  }
});

promise.then(
  (result) => {
    console.log('OK:', result); // data übergeben an resolve kann über erstes Argument in "then" abgefangen werden
  },
  (error) => {
    console.log('KO:', error); // error übergeben an reject kann über zweites Argument in "then" abgefangen werden
  }
);

// Empfohlene Schreibweise
promise
  .then((result) => {
    console.log('OK:', result); // data übergeben an resolve kann über erstes Argument in "then" abgefangen werden
  })
  .catch((error) => {
    console.log('KO:', error); // error übergeben an reject kann über "catch"  abgefangen werden
  });
