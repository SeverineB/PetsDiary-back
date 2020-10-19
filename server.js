const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const config = require('config');

const pets = require('./routes/api/pet');
const users = require('./routes/api/user');

const app = express();

// bodyparser middleware
app.use(bodyParser.json());

const corsOptions = {
  origin: ['http://localhost:8080'],
  allowedHeaders: [
    'Accept',
    'Content-Type',
    'Authorization',
    'Access-Control-Allow-Methods',
    'Access-Control-Request-Headers',
  ],
  credentials: true,
  enablePreflight: true,
};

// cors manage
app.use(cors(corsOptions));

// cookie-parser middleware
app.use(cookieParser());

// Database Config
const db = config.get('mongoURI');

// Connect to Mongo
mongoose.connect(db,
  { useNewUrlParser: true,
  useUnifiedTopology: true })
.then(() => console.log('Connexion avec MongoDB réussie !'))
.catch(err => console.log(err));

// use routes
app.use('/api/pet', pets);
app.use('/api/user', users);

const port = process.env.PORT || 3001;
const HOST = 'localhost';

app.listen(port, HOST, () => console.log(`Serveur lancé sur le port ${port}`));