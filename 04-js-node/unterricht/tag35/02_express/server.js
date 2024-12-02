import express from 'express';
import color from 'chalk';

const HOST = '127.0.0.1'; // 'localhost'
const PORT = 8080;
const BASE_URL = `http://${HOST}:${PORT}`;

const app = express(); // Factory function - Objekt wird zurückgegeben.

// Middleware
app.use(express.static('./public'));

// Routing
app.get('/', (req, res) => {
  // res.setHeader('Content-Type', 'text/html'); // Content-Type wird automatisch von express ermittelt und gesetzt

  res.send('<h1>Hello from Express</h1>');
});

app.listen(PORT, HOST, () => {
  console.log(color.yellow(`🚀 Server is Running at: ${BASE_URL}`));
  console.log(color.magenta('To close CTRL + C'));
});
