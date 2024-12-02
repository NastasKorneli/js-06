import fs from 'node:fs';
import { parse } from 'csv-parse';

const productCSV = fs.readFileSync('./data/products.csv', 'utf-8');

// Parser-Optionen definieren
const options = {
  delimiter: ',', // Trennzeichen
  trim: true, // Whitespace entfernen
  columns: true, // Erste Zeile als Keys für die Objekte verwenden
  cast: (value, context) => {
    if (context.column === 'Quantity' || context.column === 'Price') {
      return Number(value);
    }
    return value;
  },
};

// CSV parsen
parse(productCSV, options, (err, records) => {
  if (err) {
    console.error('Parsing error:', err);
    return;
  }

  // records = records.map((product) => {
  //   return { ...product, Quantity: Number(product.Quantity), Price: Number(product.Price) };
  // });

  console.log('Parsed Records:', records);

  const jsonOutput = JSON.stringify(records, null, 2);

  console.log('JSON Output:\n', jsonOutput);

  fs.writeFileSync('./data/products.json', jsonOutput, 'utf-8');
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
