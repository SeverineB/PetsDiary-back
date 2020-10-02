const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const config = require('config');

const pets = require('./routes/api/pets');
const users = require('./routes/api/users');

const app = express();

// bodyparser middleware
app.use(bodyParser.json());

// Session middleware
app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));

const corsOptions = {
  origin: "http://localhost:8080"
};

// cors manage
app.use(cors(corsOptions));

// Database Config
const db = config.get('mongoURI');

// Connect to Mongo
mongoose.connect(db,
  { useNewUrlParser: true,
  useUnifiedTopology: true })
.then(() => console.log('Connexion avec MongoDB réussie !'))
.catch(err => console.log(err));

// use routes
app.use('/api/pets', pets)
app.use('/api/users', users)

const port = process.env.PORT || 3000;
const HOST = 'localhost';

app.listen(port, HOST, () => console.log(`Serveur lancé sur le port ${port}`));