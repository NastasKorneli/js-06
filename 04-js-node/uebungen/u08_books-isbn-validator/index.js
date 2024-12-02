import fs from 'node:fs';
import { parse } from 'csv-parse';
import validator from 'validator';

const booksCSV = fs.readFileSync('books.csv', 'utf-8');

const options = {
  delimiter: ',',
  columns: true,
  skip_empty_lines: true,
  trim: true,
};

parse(booksCSV, options, (err, records) => {
  if (err) {
    console.error('Parsing error:', err);
    return;
  }

  // [
  // { Title: "value", ISBN: "value"},
  // ...
  // ]

  const invalidIsbns = records.filter((book) => {
    return !validator.isISBN(book['ISBN']);
  });

  console.log(invalidIsbns);

  fs.writeFile('invalidBooks.json', JSON.stringify(invalidIsbns, null, 2), 'utf-8', (err) => {
    if (err) console.log(err);
    console.log('file created');
  });
});

// parse(booksCSV, (err, records) => {
//   if (err) {
//     console.error('Parsing error:', err);
//     return;
//   }

//   records.shift();

//   console.log(records);

//   const invalidIsbn = records.filter((row) => {
//     const isbn = row[1].trim();
//     return !validator.isISBN(isbn);
//   });

//   console.log('Ungültige ISBNs:', invalidIsbn);
// });
