const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth');
const multer = require('../../middlewares/multer');

const Pet = require('../../controllers/pet.controller');

// @route GET api/pet with async await function

router.get('/', Pet.findAll);

// @route GET api/pet

router.get('/:id', Pet.findById);

// @route POST api/pet
// @desc Create a pet

router.post('/add', auth, multer, Pet.addPet);

// @route PATCH api/pet
// @desc Update a pet

router.patch('/edit/:id', auth, multer, Pet.updatePet);

// @route DELETE api/pets/:id
// @desc Delete a pet

router.delete('/:id', (req, res, next) => {
  const _id = req.params.id;
  findById(_id)
  .then(pet => pet.remove().then(() => res.json({ success: true })))
  .catch(err => res.status(404).json({ success: false }));
  });

module.exports = router;