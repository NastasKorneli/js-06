const fs = require('fs'); // NodeJS Schreibweise (commonJS) zum Einbinden eines Moduls - hier file-system aus der Standardbibliothek von Node (aus dem Core)

const data = fs.readFileSync('./csv/programming-langs.csv', 'utf-8');

console.log(data);
// node index.js
