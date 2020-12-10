const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth');

const Weight = require('../../controllers/weight.controller');

// @route POST api/pet/weight
// @desc Create new pet weight

router.post('/add', auth, Weight.addWeight);

// @route PUT api/pet/weight
// @desc Update weight of a pet

router.put('/edit/:id', auth, Weight.updateWeight);

// @route PUT api/pet/weight
// @desc Delete weight of a pet

router.delete('/:id', auth, Weight.deleteWeight);

module.exports = router;