const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth');
const multer = require('../../middlewares/multer');

const Pet = require('../../controllers/pet.controller');

// @route GET api/pet with async await function

router.get('/', Pet.findAll);

// @route GET api/pet

router.get('/:id', Pet.findById);

// @route GET api/pet/:id
// @desc Get all the events of a pet

router.get('/:id/events', Pet.getAllEvents);

// @route POST api/pet
// @desc Create a pet

router.post('/add', auth, multer, Pet.addPet);

// @route PATCH api/pet
// @desc Update a pet

router.patch('/edit/:id', auth, multer, Pet.updatePet);

// @route DELETE api/pet/:id
// @desc Delete a pet

router.delete('/:id', auth, Pet.deletePet);

module.exports = router;
