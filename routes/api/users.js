const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

const User = require('../../models/User');

// @route GET api/users
// @desc Get all users

router.get('/', (req, res) => {
  User.find()
  .sort({ name: -1 })
  .then(users => res.json(users))
});

// @route POST api/users
// @desc Create new user

router.post('/register', (req, res, next) => {
  const { username, email, password } = req.body;
 
  if (!email || !password || !username) {
    return res.status(400).json({msg: 'Merci de renseigner tous les champs'});
  }

  User.findOne({ email })
  .then(user => {
    if(user) {
      return res.status(400).json({ msg: 'Cet utilisateur existe déjà'});
    }
  })
  const newUser = new User({
    email,
    password: bcrypt.hashSync(password, 10),
    username,
  });
  newUser.save().then(user => {res.json(user)});
});

// @route POST api/users
// @desc Login user

router.post('/login', (req, res, next) => {
});

module.exports = router;