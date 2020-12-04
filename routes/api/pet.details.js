const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth');
const multer = require('../../middlewares/multer');

const PetDetails = require('../../controllers/pet.details.controller');


// @route GET api/pet/details

 router.get('/', PetDetails.findAll);

// @route POST api/pet/details
// @desc Create new pet details

router.post('/add', auth, PetDetails.add);

// @route PATCH api/pet/details
// @desc Update details of a pet

router.put('/edit/:id', auth, PetDetails.updatePetDetailsByIdOfPet);

// @route DELETE api/pet/details:id
// @desc Delete details

router.delete('/:id', (req, res, next) => {
  const _id = req.params.id;
  findById(_id)
  .then(pet => pet.remove().then(() => res.json({ success: true })))
  .catch(err => res.status(404).json({ success: false }));
  });

module.exports = router;