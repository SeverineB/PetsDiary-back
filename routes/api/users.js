const express = require('express');
const router = express.Router();
const Bcrypt = require('bcryptjs');

const User = require('../../models/User');

// @route POST api/users
// @desc Create a user
router.post('/register', (req, res, next) => {
  const newUser = new User({
    email: req.body.email,
    password: Bcrypt.hashSync(req.body.password, 10),
    name: req.body.name,
  });

  newUser.save().then(user => res.json(user));
});

module.exports = router;