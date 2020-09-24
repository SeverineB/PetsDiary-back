const express = require('express');
const router = express.Router();


// Pet Model
const Pet = require('../../models/Pet');


// @route GET api/pets
// @desc Get all pets
router.get('/', (req, res) => {
  Pet.find()
  .sort({ name: -1 })
  .then(pets => res.json(pets))
});

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
  Pet.findById(_id)
  .then(pet => pet.remove().then(() => res.json({ success: true })))
  .catch(err => res.status(404).json({ success: false }));
  });

module.exports = router;