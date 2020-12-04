const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth');

const Vaccine = require('../../controllers/vaccine.controller');

// @route POST api/pevaccine
// @desc Create new pet vaccine

router.post('/add', auth, Vaccine.addVaccine);

// @route PUT api/pet/vaccine
// @desc Update vaccine of a pet

router.put('/edit/:id', auth, Vaccine.updateVaccine);

module.exports = router;