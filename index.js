// Toujours commencer par importer les variables d'environnement !
require('dotenv').config();
const expressSession = require('express-session');

const express = require('express');

// on importe le router
const router = require('./app/router');

// un peu de config
const PORT = process.env.PORT || 5000;

const app = express();

app.use(expressSession({
  resave: true,
  saveUninitialized: true,
  secret: 'Guess it!',
  cookie: {
    secure: false,
    maxAge: (1000 * 60 * 60), // ça fait une heure
  },
}));

app.set('view engine', 'ejs');
app.set('views', './app/views');

// servir les fichiers statiques qui sont dans "integration"
app.use(express.static('integration'));

// routage !
app.use(router);

// on lance le serveur
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
