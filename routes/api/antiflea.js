const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth');

const Antiflea = require('../../controllers/antiflea.controller');

// @route POST api/pet/antiflea
// @desc Create new pet antiflea

router.post('/add', auth, Antiflea.addAntiflea);

// @route PUT api/pet/antiflea
// @desc Update antiflea of a pet

router.put('/edit/:id', auth, Antiflea.updateAntiflea);

// @route PUT api/pet/antiflea
// @desc Delete antiflea item of a pet

router.delete('/:id', auth, Antiflea.deleteAntiflea);

module.exports = router;