const fs = require('fs'); // CommonJS

fs.readFile('data/products.csv', 'UTF8', (error, data) => {
  console.log(data); // 2 output
});

for (let i = 0; i < 200000000; i++) {
  // be busy for a few seconds
}
console.log('ready'); // 1 output
