const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth');

const User = require('../../controllers/user.controller');

// @route GET api/user
// @desc Get all users

router.get('/users', User.findAll);

// @route POST api/user
// @desc Create new user

router.post('/register', User.register);

// @route POST api/user
// @desc Login user

router.post('/login', User.login);

// @route POST api/user
// @desc Check if user logged

router.post('/isLogged', auth, User.checkIsLogged);

// @route GET api/user
// @desc Deconnect user

router.get('/logout', auth, User.logout);

// @route GET api/user
// @desc Get all pets of a user

router.get('/:id/pets', auth, User.getAllPets);

module.exports = router;