import fs from 'fs';

const quotedCSV = '"very big, soft computer mouse","the cutest peripheral ever","10","39.90"';

const productCSV = fs.readFileSync('product.csv', 'utf-8');

const data = productCSV.split('","');

const data2 = productCSV.split('","').map(
  (item) => item.replace(/^"|"$/g, '') // Entfernt führende und abschließende Anführungszeichen
);

const fields = productCSV.slice(1, -1).split('","');

console.log(data);
console.log(data2);
console.log(fields);

// Übung 1: CSV-Datensätze mit Anführungszeichen
// Bisher haben wir die Felder in einem CSV-Datensatz einfach mit der Anweisung:

// record.split(",");
// ​
// in einzelne Felder zerlegt. In der Praxis kann es aber vorkommen, dass ein einzelnes Feld ein Komma enthält. Das Problem wird üblicherweise gelöst, indem die einzelnen Felder noch mit Anführungszeichen umgeben werden. Hier ist ein Beispiel:

// "very big, soft computer mouse","the cutest peripheral ever","10","39.90"
// ​
// Das erste Feld enthält ein Komma (very big, soft computer mouse), trotzdem ist die Unterteilung eindeutig. Schreiben Sie ein kurzes Programm, dass diesen Datensatz korrekt zerlegt und die einzelnen Felder ausgibt:

// const quotedCSV = '"very big, soft computer mouse","the cutest peripheral ever","10","39.90"';

// all fields are quoted
