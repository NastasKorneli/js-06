import express from 'express';
import color from 'chalk';

const PORT = 8080;
const HOST = '127.0.0.1'; // 'localhost'
const BASE_URL = `http://${HOST}:${PORT}`;

const app = express();

// Middleware
app.use(express.static('./public'));

// Routes

// http://127.0.0.1:8080/users/123/books/12
app.get('/users/:userId/books/:bookId', (req, res) => {
  console.log('req.params', req.params);
  console.log('userId: ', req.params.userId);
  console.log('bookId: ', req.params.bookId);

  res.send(req.params);
});

// http://127.0.0.1:8080/flights/FRA-NCE
app.get('/flights/:from-:to', (req, res) => {
  console.log('req.params', req.params);
  res.send(req.params);
});

// Beispiel URL: http://127.0.0.1:8080/plantae/Prunus.persica
app.get('/plantae/:genus.:species', (req, res) => {
  console.log('req.params:', req.params);
  res.send(req.params);
});

// Query String abfangen

// Beispiel URL: http://127.0.0.1:8080/contact/send?firstName=Max&lastName=Mustermann&age=35
app.get('/contact/send', (req, res) => {
  console.log('req.query:', req.query);
  res.send(req.query);
});

app.get('/', (req, res) => {
  res.send('Server works..');
});

// Server start
app.listen(PORT, HOST, () => {
  console.log(color.green(`🚀 SERVER IS RUNNING AT: ${BASE_URL}`));
  console.log(color.yellow('CTRL + C to shutdown'));
});
