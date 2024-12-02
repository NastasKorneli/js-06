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

app.get('/info', (req, res) => {
  const stockInfo = {
    price: (174 + 20 * Math.random()).toFixed(2),
    volume: (1500000 * 50000 * Math.random()).toFixed(2),
    time: new Date().toLocaleTimeString(),
  };

  // Express Verarbeitung (automatisert)
  // res.setHeader('Content-Type', 'application/json');
  // res.write(JSON.stringify(stockInfo));
  // res.end();

  res.send(stockInfo);
});

// Server start
app.listen(PORT, HOST, () => {
  console.log(color.green(`🚀 SERVER IS RUNNING AT: ${BASE_URL}`));
  console.log(color.yellow('CTRL + C to shutdown'));
});
