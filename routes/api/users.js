const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

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

module.exports = router;