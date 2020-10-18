const express = require('express');
const router = express.Router();

const PetController = require('../../controllers/pet.controller');

const auth = require('../../middlewares/auth');

// @route GET api/pets with async await function

router.get('/', PetController.findAll);

// @route POST api/pets
// @desc Create a pet

router.post('/add', PetController.addPet);

// @route POST api/pets
// @desc Find health diary by pet ID

router.post('/health', PetController.findHealthByPet);

// @route POST api/pets
// @desc Find pets of a user

router.get('/pets', PetController.findPetsByUser);

// @route DELETE api/pets/:id
// @desc Delete a pet

router.delete('/:id', (req, res, next) => {
  const _id = req.params.id;
  findById(_id)
  .then(pet => pet.remove().then(() => res.json({ success: true })))
  .catch(err => res.status(404).json({ success: false }));
  });

module.exports = router;