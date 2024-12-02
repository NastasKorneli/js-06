// const fs = require('fs'); // Modul aus der Standardbibliothek
import fs from 'node:fs'; // Modul aus der Standardbibliothek

let data;

fs.writeFileSync('hello.txt', 'hello World', 'utf8');

// fs.readFileSync(…)
// liest eine Datei ein (blockierende Variante)
data = fs.readFileSync('hello.txt', 'utf8');

console.log(data);

// fs.readFile(…)
// liest eine Datei ein (asynchrone Variante)
fs.readFile('hello.txt', 'utf8', (error, data) => {
  console.log(data);
});

// fs.writeFileSync(…)
// schreibt Daten in eine Datei; bereits vorhandene Daten werden überschrieben (blockierende Variante)
fs.writeFileSync('hello.txt', data, 'utf8');

console.log(data);

// fs.writeFile(…)
// schreibt Daten in eine Datei; bereits vorhandene Daten werden überschrieben (asynchrone Variante)
fs.writeFile('hello.txt', data, 'UTF8', (error) => {
  if (error) console.log('Error: ' + error);
  console.log('Datei erstellt');
});

// fs.statSync(…)
// ermittelt Infos zur Datei (blockierende Variante)
const stats = fs.statSync('hello.txt');

// console.log('File Stats: ', stats);

console.log('File size: ', stats.size); // => size in bytes
console.log('File birthdate: ', stats.birthtime); // => enstehungsdatum der Datei

// fs.stat(…)
// ermittelt Infos zur Datei (asynchrone Variante)
fs.stat('hello.txt', (error, stats) => console.log(stats.size)); // => size in bytes

// fs.unlinkSync(…)
// löscht eine Datei (blockierende Variante)
// fs.unlinkSync('hello.txt');

fs.writeFileSync('hello.txt', 'hello World');

// fs.unlink(…)
// löscht eine Datei (asynchrone Variante)
// fs.unlink('hello.txt', (error) => {
//   if (error) console.log('Error: ' + error);
// });
