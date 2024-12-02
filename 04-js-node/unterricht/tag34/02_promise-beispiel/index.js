import fs from 'node:fs';

// Funktion, die einen asynchronen Prozess beinhaltet.
const getData = (filePath, encoding = 'utf-8') => {
  return new Promise((resolve, reject) => {
    // async process
    fs.readFile(filePath, encoding, (error, data) => {
      if (error) reject(error); // console.log(error);
      // console.log(data);
      resolve(data);
      // createHtmlDocument(data);
    });
  });
};

// Funktionsaufruf von einer Funktion, die einen asynchronen Prozess. Asynchronses Ergebnis kann dank Promise Objekt über "then" verarbeitet werden.
getData('data.txt')
  .then((data) => {
    createHtmlDocument(data);
  })
  .catch((err) => {
    console.log(err);
  });

// Funktionen
const createHtmlDocument = (content = '') => {
  const headerStr = `<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title></title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" />
  </head>
  <body>
    <main>
      <div class="container py-5">`;

  const footerStr = ` </div>
    </main>
  </body>
</html>`;

  const html = `${headerStr}${content}${footerStr}`;
  fs.writeFileSync('example.html', html, 'utf8');
};
