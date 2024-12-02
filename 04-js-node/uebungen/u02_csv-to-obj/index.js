import fs from 'fs';
import { parse } from 'csv-parse'; // https://csv.js.org/

const quotedCSV =
  '"very big, soft computer mouse","the cutest peripheral ever","10","39.90","very big, soft computer mouse",10';

// Übung 2: CSV-Datensätze mit Anführungszeichen — Teil 2

let fields = [];
let index = 0;
let state = 'outside';

quotedCSV.split('').forEach((char) => {
  if (state === 'quoted') {
    fields[index] += char; // => [",v,e,r,y..."]
    if (char === '"') {
      state = 'outside';
      index += 1;
    }
  } else if (state === 'unquoted') {
    if (char === ',') {
      state = 'outside';
      index += 1;
    } else {
      fields[index] += char;
    }
  } else if (state === 'outside') {
    fields[index] = char; //=> [",...
    if (char === '"') {
      state = 'quoted';
    } else if (char !== ',') {
      state = 'unquoted';
    }
  }
});

console.log(fields);

// In der Praxis finden sich auch CSV-Datensätze, in denen manche Felder mit Anführungszeichen umgeben sind und manche nicht.

// Schreibe Sie ein Programm, das auch mit diesen Fällen zurechtkommt.

// Optional: Modul zum parsen einer CSV raussuchen und anwenden.

// Variante 2: Stackoverflow

const test = quotedCSV.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);

console.log(test);

// https://stackoverflow.com/questions/11456850/split-a-string-by-commas-but-ignore-commas-within-double-quotes-using-javascript

// https://i.sstatic.net/E0Tbw.png

// ".*?"  <-  double quotes + anything but double quotes + double quotes
// |           OR
//[^",\s]+    1 or more characters exclusive double quotes, comma or spaces of any kind
// )
// (?=            FOLLOWED BY
// \s*,        0 or more empty spaces and a comma
// |           OR
// \s*$        0 or more empty spaces and nothing else (end of string)
// )

// Variante 3: chatGpt

const regex = /(?:"([^"]*(?:""[^"]*)*)"|([^",]*))(?:,|$)/g;

const matches = quotedCSV.match(regex).map((match) => match.replace(/(^"|"$)/g, ''));

console.log(matches);

// Variante 4: Mit Modul csv-parse

// const quotedCSV = '"very big, soft computer mouse","the cutest peripheral ever","10","39.90"';

const productCSV = fs.readFileSync('product.csv', 'utf-8');

// Parser-Optionen definieren
const options = {
  delimiter: ',', // Trennzeichen
  quote: '"', // Zeichen, das die Werte umschließt
  trim: true, // Whitespace entfernen
};

// CSV parsen
parse(productCSV, options, (err, records) => {
  if (err) {
    console.error('Parsing error:', err);
    return;
  }
  console.log('Parsed Records:', records[0]);
});
