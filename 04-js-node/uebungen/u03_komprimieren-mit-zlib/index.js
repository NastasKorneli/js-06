import zlib from 'node:zlib';
import fs from 'node:fs';

const data = fs.readFileSync('products.html', 'utf-8');

const compressedData = zlib.gzipSync(data);

console.log(compressedData);

fs.writeFile('products.html.gz', compressedData, 'utf-8', (error) => {
  if (error) {
    console.error(error);
  }
  console.log('compressed file created.');
});

// Übung 3: Ohne Umwege

// Kombiniere Codebeispiel 18 und Codebeispiel 21. Die Datei products.html.gz soll direkt aus der Datei products.csv erzeugt werden, ohne Umweg über die Datei products.html!
