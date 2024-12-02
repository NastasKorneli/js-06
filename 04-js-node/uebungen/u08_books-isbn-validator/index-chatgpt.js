import fs from 'node:fs';
import readline from 'node:readline';

// === Funktion zur Überprüfung von ISBN-10 ===
const validateISBN10 = (isbn) => {
  // Entferne Bindestriche oder Leerzeichen
  const cleanISBN = isbn.replace(/[-\s]/g, '');

  if (cleanISBN.length !== 10) return false;

  const sum = cleanISBN
    .split('')
    .map((char, index) => (char === 'X' && index === 9 ? 10 : parseInt(char, 10)))
    .reduce((acc, num, i) => acc + num * (10 - i), 0);

  return sum % 11 === 0;
};

// === Funktion zur Überprüfung von ISBN-13 ===
const validateISBN13 = (isbn) => {
  const cleanISBN = isbn.replace(/[-\s]/g, '');

  if (cleanISBN.length !== 13 || isNaN(cleanISBN)) return false;

  const sum = cleanISBN
    .split('')
    .map((digit, index) => parseInt(digit, 10) * (index % 2 === 0 ? 1 : 3))
    .reduce((acc, num) => acc + num, 0);

  return sum % 10 === 0;
};

// === Hauptprogramm ===
const validateISBNsInCSV = (filePath) => {
  const invalidRecords = [];

  const rl = readline.createInterface({
    input: fs.createReadStream(filePath),
    output: process.stdout,
    terminal: false,
  });

  let firstLine = true;

  rl.on('line', (line) => {
    if (firstLine) {
      firstLine = false;
      return;
    }

    const [title, isbn] = line.split(/\s*,\s*/);

    const isValid = validateISBN10(isbn.trim()) || validateISBN13(isbn.trim());
    if (!isValid) {
      invalidRecords.push({ title, isbn });
    }
  });

  rl.on('close', () => {
    console.log('\nUngültige Datensätze:');
    if (invalidRecords.length === 0) {
      console.log('Alle ISBNs sind gültig.');
    } else {
      invalidRecords.forEach(({ title, isbn }) => {
        console.log(`Titel: "${title.trim()}", ISBN: "${isbn.trim()}"`);
      });
    }

    console.log(invalidRecords);
  });
};

// === Datei einlesen und validieren ===
const filePath = './books.csv'; // Pfad zur Datei
validateISBNsInCSV(filePath);

// Übung 8: ISBNs aus einer CSV-Datei validieren

// Gegeben sei folgende CSV-Datei mit Titeln und ISBNs einiger Bücher — allerdings mit Fehlern: Zwei ISBNs sind ungültig.

// Schreibe ein Programm, das die Datei einliest und alle ISBNs validiert! Datensätze mit ungültigen ISBNs sollen ausgegeben werden.
