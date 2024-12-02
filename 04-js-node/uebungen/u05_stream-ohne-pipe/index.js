// const fs = require('fs');
// const zlib = require('zlib');
import fs from 'node:fs';
import zlib from 'node:zlib';

const inputStream = fs.createReadStream('products.html'); // stream Modul wird verwendet.
const outputStream = fs.createWriteStream('products.html.gz');

inputStream.on('data', (data) => {
  console.log('Pakete (Daten) geladen: ', data.length);
  //console.log(data);

  outputStream.write(zlib.gzipSync(data)); // ohne pipe - Methode - Daten päckchenweise verarbeitet und an outputStream weitergeleitet
});

inputStream.on('end', () => {
  console.log('Pakete (Daten) wurden fertig gestreamt');
});

// Übung 5: Datenströme
// Schreibe Codebeispiel 41 um, ohne die Funktion pipe(…) zu verwenden!

// TIPP: Um eine Datei päckchenweise lesen- und schreiben zu können, gibt es für das fs Modul die Methoden createReadStream und createWriteStream.
