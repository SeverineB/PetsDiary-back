const express = require('express');
const router = express.Router();
const config = require('config');

const user = require('../../controllers/user.controller');

// @route GET api/user
// @desc Get all users

/* router.get('/', user.findAll); */

// @route POST api/user
// @desc Create new user

router.post('/register', user.register);

// @route POST api/user
// @desc Login user

router.post('/login', user.login);

// @route POST api/user
// @desc Check if user logged

router.post('/isLogged', user.checkIsLogged);

// @route POST api/user
// @desc Find pets by user ID

router.get('/pets/:id', user.findAllPetsOfUser);

// @route POST api/user
// @desc Deconnect user

router.post('/logout', user.logout);

module.exports = router;