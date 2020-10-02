const express = require('express');
const router = express.Router();
const config = require('config');

const UserController = require('../../controllers/users/users');

// @route GET api/users
// @desc Get all users

router.get('/', UserController.findAll);

// @route POST api/users
// @desc Create new user

router.post('/register', UserController.createOne);

// @route POST api/users
// @desc Login user

router.post('/login', UserController.login);

// @route POST api/users
// @desc Check if user logged

router.post('/isLogged', UserController.checkIsLogged);

// @route POST api/users
// @desc Deconnect user

router.post('/logout', UserController.logout);

module.exports = router;