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

app.get('/book/:title', (req, res) => {
  res.send(req.params);
});

// Server start
app.listen(PORT, HOST, () => {
  console.log(color.green(`🚀 SERVER IS RUNNING AT: ${BASE_URL}`));
  console.log(color.yellow('CTRL + C to shutdown'));
});

// Übung 19: Strings in Parametern
// Schreibe eine Variante von server.js, die eine Route der Form /book/:title definiert und den Wert von title in die Konsole loggt! Der Inhalt der erstellten Webseite ist egal — Du kannst einfach OK als Antwort geben.

// Rufe den Server mit folgenden Beispielen auf:

// http://127.0.0.1:8081/book/Do%20Androids%20Dream%20of%20Electric%20Sheep%3F
// Ergebnis: Auf der Konsole wird Do Androids Dream of Electric Sheep? geloggt.

// http://127.0.0.1:8081/book/Do Androids Dream of Electric Sheep?
// Ergebnis: Moderne Webbrowser drücken bei den Leerschritten ein Auge zu und leiten sie korrekt weiter, das Fragezeichen wird aber als Beginn eines Query-Strings interpretiert und nicht als Teil des Parameters. Auf der Konsole fehlt es daher.

// http://127.0.0.1:8081/book/TCP%2FIP
// Ergebnis: Der Titel des Buches ist TCP/IP.

// http://127.0.0.1:8081/book/TCP/IP
// Ergebnis: Der Schrägstrich wird als Pfadtrenner interpretiert, und die Route stimmt überhaupt nicht.
