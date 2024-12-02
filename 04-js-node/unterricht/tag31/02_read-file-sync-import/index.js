import fs from 'fs'; // ES6 Modulschreibweise (2018)
// Funktioniert nur mit Dateiendung .mjs oder "type": "module" in der package.json Datei oder ab Node Version 22

// import fs from 'node:fs';  // Kennzeichnung von Modulen aus der Standardbibliothek mit prefix "node:" möglich.

const data = fs.readFileSync('./csv/programming-langs.csv', 'utf-8');

console.log(data);
// node index.js
