import http from 'node:http';
import fs from 'node:fs';
import color from 'chalk';

const HOST = '127.0.0.1'; // 'localhost'
const PORT = 8080;
const BASE_URL = `http://${HOST}:${PORT}`;

const server = http.createServer((req, res) => {
  console.log('HTTP-Request:', req.headers);
  // Übung 15
  console.log('HTTP-Header user-agent:', req.headers['user-agent']);
  console.log('HTTP-Method:', req.method); // Standard: GET - POST, PUT, PATCH, OPTIONS, DELETE
  console.log('HTTP-Request URL:', req.url);
  console.log('=========================');

  // https://de.wikipedia.org/wiki/HTTP-Statuscode
  console.log('HTTP Response Status Code:', res.statusCode);

  switch (req.url) {
    case '/':
      res.setHeader('Content-Type', 'text/plain');
      res.write('Hello from Server!');
      res.end();
      break;

    case '/about.html':
      const html = fs.readFileSync('./public/about.html', 'utf-8');
      res.setHeader('Content-Type', 'text/html');
      res.write(html);
      res.end();

      break;

    case '/assets/css/main.css':
      const css = fs.readFileSync('./public/assets/css/main.css', 'utf-8');
      res.setHeader('Content-Type', 'text/css');
      res.write(css);
      res.end();
      break;

    case '/assets/img/image.jpg':
      const image = fs.readFileSync('./public/assets/img/image.jpg');
      res.setHeader('Content-Type', 'image/jpeg');
      res.write(image);
      res.end();
      break;

    case '/persons.json':
      const persons = [
        { firstName: 'Max', lastName: 'Mustermann' },
        { firstName: 'Jane', lastName: 'Doe' },
      ];

      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify(persons));
      res.end();
      break;
    default:
      res.setHeader('Content-Type', 'text/plain');
      res.statusCode = 404;
      res.write('File not found');
      res.end();
  }
});

server.listen(PORT, HOST, () => {
  console.log(color.yellow(`Server is running at ${BASE_URL}`));
  console.log(color.magenta('To shutdown server CTRL + C.'));
});
