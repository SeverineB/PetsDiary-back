const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth');

const Pet = require('../../controllers/pet.controller');


// @route GET api/pets with async await function

router.get('/', Pet.findAll);

// @route POST api/pets
// @desc Create a pet

router.post('/add', auth, Pet.addPet);

// @route POST api/pets
// @desc Find health diary by pet ID

router.post('/health', auth, Pet.findHealthByPet);

// @route DELETE api/pets/:id
// @desc Delete a pet

router.delete('/:id', (req, res, next) => {
  const _id = req.params.id;
  findById(_id)
  .then(pet => pet.remove().then(() => res.json({ success: true })))
  .catch(err => res.status(404).json({ success: false }));
  });

module.exports = router;