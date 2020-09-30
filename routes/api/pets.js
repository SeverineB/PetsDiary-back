const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Pet Model
const Pet = require('../../models/Pet');


// @route GET api/pets
// @desc Get all pets
/* router.get('/', async (req, res) => {
  Pet.find()
  .sort({ name: -1 })
  .then(pets => res.json(pets))
}); */

// @route GET api/pets with async await function

router.get('/', async (req, res) => {
  try {
    const pets = await Pet.find({})
    res.send(pets)
  } catch (error) {
    res.status(500).send()
  }
})

// @route POST api/pets
// @desc Create a pet
router.post('/', (req, res, next) => {
  const newPet = new Pet({
    picture: req.body.picture,
    name: req.body.name,
    age: req.body.age,
    species: req.body.species,
    breed: req.body.breed
  });

  newPet.save().then(pet => res.json(pet));
});

// @route DELETE api/pets/:id
// @desc Delete a pet
router.delete('/:id', (req, res, next) => {
  const _id = req.params.id;
  findById(_id)
  .then(pet => pet.remove().then(() => res.json({ success: true })))
  .catch(err => res.status(404).json({ success: false }));
  });

module.exports = router;