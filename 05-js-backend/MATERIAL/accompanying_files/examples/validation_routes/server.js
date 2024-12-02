import express from 'express';
import color from 'chalk';
import jwt from 'jsonwebtoken';
import validator from 'validator';

const PORT = 8080;
const HOST = '127.0.0.1'; // 'localhost'
const BASE_URL = `http://${HOST}:${PORT}`;

const app = express();

// Middleware

// Model Dummy für Blogbeiträge
const posts = [
  {
    username: 'Max',
    title: 'Post 1 von Max',
    article: 'Mein erster Blogbeitrag von Max',
  },
  {
    username: 'Jane',
    title: 'Post 1 von Jane',
    article: 'Mein erster Blogbeitrag von Jane',
  },
];

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));

// JWT Token wird verifiziert als MiddleWare
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  const token = authHeader && authHeader.split(' ')[1]; // => ['Bearer', <token>]

  console.log('token: ', token);

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, 'MeinSecretKey', (err, data) => {
    if (err) {
      return res.status(403).json({ msg: 'Access forbidden', status: 403 });
    }

    // Wir fügen dem Request-Objekt das "user"-Objekt als Eigenschaft hinzu.
    req.user = data;
    next();
  });
};

// Routes =======
app.get('/', (req, res) => {
  res.send('Server works..');
});

// Beim Login wird der JW-Token generiert
app.post('/login', (req, res) => {
  const username = req.body.username;

  console.log('username: ', username, req.body);

  // Validierung
  if (!username || !validator.isLength(username, { min: 3 })) {
    return res
      .status(400)
      .json({ msg: 'Username muss mindestens 3 Zeichen lang sein' });
  }

  // Dummy user document
  const user = {
    username: username,
  };

  //... bei gefundenem User wird ein accessToken generiert
  const accessToken = jwt.sign(user, 'MeinSecretKey'); // sign(zu verschlüsselnde Datensatz, private Key)

  res.json({ token: accessToken });
});

// API Routes =======
app.get('/api/posts/all', (req, res) => {
  res.json(posts);
});

// (C)RUD - Create eines neuen Blogeintrag über authentifizierten Nutzer
app.post('/api/posts', verifyToken, (req, res) => {
  const { title, article } = req.body;
  const user = req.user;

  if (!user) {
    return res
      .status(400)
      .json({ msg: 'Authorization went wrong', status: 400 });
  }

  // Validierung
  let errors = [];
  if (!title || !validator.isLength(title, { min: 5 })) {
    errors.push({ msg: 'Title muss mindestens 5 Zeichen lang sein' });
  }
  if (!article || !validator.isLength(article, { min: 20 })) {
    errors.push({ msg: 'Article muss mindestens 20 Zeichen lang sein' });
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  posts.push({
    username: user.username,
    title,
    article,
  });

  res.status(200).json({ msg: 'Neuer Post hinzugefügt', status: 200 });
});

// Server start
app.listen(PORT, HOST, () => {
  console.log(color.green(`🚀 SERVER IS RUNNING AT: ${BASE_URL}`));
  console.log(color.yellow('CTRL + C to shutdown'));
});
