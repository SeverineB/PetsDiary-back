const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const config = require('config');
const multer = require('multer');
require('dotenv').config();

const pets = require('./routes/api/pet');
const users = require('./routes/api/user');
const weight = require('./routes/api/weight');
const vaccine = require('./routes/api/vaccine');
const deworming = require('./routes/api/deworming');
const antiflea = require('./routes/api/antiflea');
const events = require('./routes/api/event');

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
  useUnifiedTopology: true,
  useFindAndModify: false})
.then(() => console.log('Connexion avec MongoDB réussie !'))
.catch(err => {
    console.log('Erreur lors de la connexion à la database')
    console.log(err)
});

// use routes
app.get('/', (req, res) => {
    res.send('Ici le super serveur de Pets Diary')
})
app.use('/upload/avatars', express.static(__dirname + '/upload/avatars'));
app.use('/api/pet', pets);
app.use('/api/user', users);
app.use('/api/pet/weight', weight);
app.use('/api/pet/vaccine', vaccine);
app.use('/api/pet/deworming', deworming);
app.use('/api/pet/antiflea', antiflea);
app.use('/api/event', events);

// errors handling middleware
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send({message: 'Une erreur est survenue !'});
})

const port = 3000;
const HOST = 'localhost';

app.listen(port, () => {
    console.log(`Serveur lancé sur le port ${port}`)});