import express from 'express';
import color from 'chalk';

const PORT = 8080;
const HOST = '127.0.0.1'; // 'localhost'
const BASE_URL = `http://${HOST}:${PORT}`;

const app = express();

// eigene Middleware
app.use((req, res, next) => {
  console.log(req.headers['user-agent']);
  console.log(color.magenta(req.method));

  next(); // Funktion wird beendet. // Offene HTTP-Request -Anfrage wird weitergeleitet.
});

// Middleware
app.use(express.static('./public'));

// Routes
app.get('/', (req, res) => {
  res.send('Server works..');
});

// Übung 16
app.get('/seite.html', (req, res) => {
  // res.setHeader('Content-Type', 'text/html');
  res.send('<h2>lorem ipsum</h2>');
});

// Server start
app.listen(PORT, HOST, () => {
  console.log(color.green(`🚀 SERVER IS RUNNING AT: ${BASE_URL}`));
  console.log(color.yellow('CTRL + C to shutdown'));
});
