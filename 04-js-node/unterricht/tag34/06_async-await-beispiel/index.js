import fs from 'node:fs';

// Funktion, die einen asynchronen Prozess beinhaltet.
const getData = async (filePath, encoding = 'utf-8') => {
  try {
    const data = await fs.promises.readFile(filePath, encoding);
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

getData('data.txt').then((data) => {
  // console.log(data);
  createHtmlDocument(data);
});

// Funktionsaufruf von einer Funktion, die einen asynchronen Prozess. Asynchronses Ergebnis kann dank Promise Objekt über "then" verarbeitet werden.
// getData('data.txt')
//   .then((data) => {
//     createHtmlDocument(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

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
