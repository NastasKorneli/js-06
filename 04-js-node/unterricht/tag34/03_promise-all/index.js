import fs from 'node:fs';

const getData = (filePath, encoding = 'utf-8') => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, encoding, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};

Promise.all([
  getData('files/file1.txt'),
  getData('files/file2.txt'),
  getData('files/file3.txt'),
  getData('files/file4.txt'),
])
  .then((results) => {
    console.log(results);
  })
  .catch((err) => console.log(err));

// Promise Methode - all

Promise.all([
  new Promise((resolve, reject) => resolve('one')),
  new Promise((resolve, reject) => resolve('two')),
  new Promise((resolve, reject) => reject(new Error('error'))),
  new Promise((resolve, reject) => resolve('four')),
])
  .then((results) => {
    results.forEach((result) => {
      console.log(result); // => one↲ two↲ three↲
    });
  })
  .catch((error) => {
    console.log(error);
  });
