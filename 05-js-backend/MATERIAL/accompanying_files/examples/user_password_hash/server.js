import express from 'express';
import color from 'chalk';
import bcrypt from 'bcryptjs';

const PORT = 8080;
const HOST = '127.0.0.1'; // 'localhost'
const BASE_URL = `http://${HOST}:${PORT}`;

const app = express();

// Middleware =======

// app.use(bodyParser.json()) // Middlewares von express 4.16 ersetzen das Modul body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));

// dummy User model aka NoSQL - collection | rel. DB - Tabelle
const users = [
  // {
  //   username: 'Megaman',
  //   password: '123456',
  // },
];

// Routes
app.post('/users/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      username,
      password: hashedPassword,
    };

    // Nutzer in Array hinzufügen
    users.push(newUser);
  } catch (error) {
    console.log('Something went wrong. ', error);
    return res.status(500).json({ msg: 'Something went wrong', status: 500 });
  }
  //res.send('users')
  res.status(200).json({ msg: 'User wurde registriert', status: 200 });
});

// User einloggen
app.post('/users/login', async (req, res) => {
  const { username, password } = req.body;

  // suchen ob ein User mit dem übergebenen Namen existiert

  const user = users.find((user) => user.username === username);

  // Guard
  if (!user) {
    return res.status(400).json({ msg: 'Nutzer existiert nicht', status: 400 });
  }

  // "password" wird intern gehashed mit dem Salt was in dem gespeicherten Passwort (in Hashform) vorhanden ist und vergleicht er beide gehashte Passwörter
  const hasCorrectPassword = await bcrypt.compare(password, user.password);

  if (!hasCorrectPassword) {
    return res.status(400).json({ msg: 'Daten nicht korrekt', status: 400 });
  }

  res.status(200).json({ msg: 'Erfolgreich eingeloggt', status: 200 });
  // login in session oder cookies speichern
  // res.redirect('./dashboard')
});

app.get('/users', (req, res) => {
  res.json(users);
  // res.send(users);
});

app.get('/', (req, res) => {
  res.send('Server works..');
});

// Server start
app.listen(PORT, HOST, () => {
  console.log(color.green(`🚀 SERVER IS RUNNING AT: ${BASE_URL}`));
  console.log(color.yellow('CTRL + C to shutdown'));
});
