// const fs = require('fs');
// const zlib = require('zlib');
import fs from 'node:fs';
import zlib from 'node:zlib';

const gzipCompressor = zlib.createGzip();

const inputStream = fs.createReadStream('products.html'); // stream Modul wird verwendet.
const outputStream = fs.createWriteStream('products.html.gz');

inputStream.on('data', (data) => {
  console.log('Pakete (Daten) geladen: ', data.length);
  //console.log(data);

  // outputStream.write(zlib.gzipSync(data)); // ohne pipe - Methode - Daten päckchenweise verarbeitet und an outputStream weitergeleitet
});

inputStream.on('end', () => {
  console.log('Pakete (Daten) wurden fertig gestreamt');
});

inputStream
  .pipe(gzipCompressor) // Daten werden "päckchenweise" an gzipCompressor Funktion weitergereicht
  .pipe(outputStream);
