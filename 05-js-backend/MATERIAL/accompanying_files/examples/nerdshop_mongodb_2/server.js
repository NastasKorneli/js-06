import color from 'chalk'; // Modul für farbige Konsolenausgaben
import express from 'express'; // Webserver-Framework für Node.js

// Import routes
import productsRouter from './routes/products.js';

// Import config
import { PORT, HOST, SERVER_BASE_URL, connectMongoDb } from './config/index.js';

const app = express();

// Middleware =======
app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Verbindung zur MongoDB
connectMongoDb();

// API Routes
app.use('/api/products', productsRouter);

app.listen(PORT, HOST, () => {
  console.log(color.magenta(`Server running at ${SERVER_BASE_URL}`));
  console.log(color.yellow('Press Ctrl+C to quit.'));
});
