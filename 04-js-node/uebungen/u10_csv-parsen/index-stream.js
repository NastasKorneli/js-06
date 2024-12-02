import fs from 'node:fs';
import csv from 'csv-parser';

const jsonFilePath = './data/products2.json';
const csvFilePath = './data/products.csv';
const results = [];

// Helpers
const toLowerCamelCase = (str) => {
  return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (match, chr) => chr.toUpperCase());
};

// CSV-Datei einlesen und parsen
fs.createReadStream(csvFilePath)
  .pipe(
    csv({
      mapHeaders: ({ header, index }) => toLowerCamelCase(header),
    })
  )
  .on('data', (row) => {
    console.log(row);
    results.push(row);

    // Werte in das gewünschte Format konvertieren
    // results.push({
    //   code: row.Code,
    //   shortDescription: row['Short Description'],
    //   tagline: row.Tagline,
    //   quantity: parseInt(row.Quantity, 10),
    //   price: parseFloat(row.Price),
    // });
  })
  .on('end', () => {
    // JSON-Datei schreiben
    fs.writeFileSync(jsonFilePath, JSON.stringify(results, null, 2));
    console.log(`JSON-Datei wurde erstellt: ${jsonFilePath}`);
  });

// Übung 10: CSV parsen mit einem Modul
// In Lektion 2 haben wir eine CSV Datei ausgelesen und später manuell in eine Objekt-Struktur umgewandelt. Das manuelle Parsen von CSV-Dateien kann jedoch sehr aufwändig und fehleranfällig sein, insbesondere bei großen Dateien mit vielen Spalten und Zeilen. In dieser Übung soll daher ein externes Modul verwendet werden, um eine CSV-Datei zu parsen und in eine JSON-Struktur umzuwandeln.

// Suche nach einem passenden Modul und wandle über das Modul die csv- Datei products.csv in eine json Struktur um.

// [
//   {
//     "code": "MUG0007",
//     "shortDescription": "coffee mug with LCD level indicator",
//     "tagline": "never again reach for the empty mug",
//     "quantity": 20,
//     "price": 49.90
//   },
//   { ... }
// ]
