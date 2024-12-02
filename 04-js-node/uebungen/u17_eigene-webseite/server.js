import express from 'express';
import color from 'chalk';

const PORT = 8080;
const HOST = '127.0.0.1'; // 'localhost'
const BASE_URL = `http://${HOST}:${PORT}`;

const app = express();

// Middleware
app.use(express.static('./public'));

// Routes
app.get('/', (req, res) => {
  res.send('Server works..');
});

app.use((req, res) => {
  res.statusCode = 404;
  res.send('File not found');
});

// Server start
app.listen(PORT, HOST, () => {
  console.log(color.green(`🚀 SERVER IS RUNNING AT: ${BASE_URL}`));
  console.log(color.yellow('CTRL + C to shutdown'));
});

// Übung 17: Deine eigene Webseite

// Du hast sicher schon einmal ein Webseiten-Projekt mit HTML, CSS und JS-Dateien erstellt. Benutze die express.static(…)-Middleware, um die Seiten per HTTP auszuliefern.

// Erstelle neben der index.html mindestens 2 weitere HTML-Dokumente (z.B. about.html und contact.html)
