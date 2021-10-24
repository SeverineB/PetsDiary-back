const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
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
  origin: ['http://pets-diary-recette.severinebianchi.com', 'http://localhost:8080', 'http://192.168.1.22:8080'],
  allowedHeaders: [
    'Accept',
    'Origin',
    'Content-Type',
    'Authorization',
    'X-requested-Width',
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

// use routes
app.get('/', (req, res) => {
    res.send(`
    <div style="margin: 5em auto; font-family: Roboto">
        <p>Ici le super serveur de Pets Diary qui fonctionne trop bien !</p>
        <p>Serveur lancé sur ${process.env.HOST}/${process.env.PORT}</p>
        <p>Environment ${process.env.NODE_ENV}</p>
        <p>Mongodb : ${process.env.MONGO_URI}</p>
    </div>`)
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

// Connect to Mongo
mongoose.connect(process.env.MONGO_URI,
    { useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false})
  .then(() => console.log('Connexion avec MongoDB réussie !'))
  .catch(err => {
      console.log('Aaaaargh, pas de connexion avec la database MongoDB Atlas')
      console.log(err)
  });

app.listen(process.env.PORT, process.env.HOST, () => console.log(`Serveur lancé sur le port ${process.env.PORT}`));
