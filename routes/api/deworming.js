const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth');

const Deworming = require('../../controllers/deworming.controller');

// @route POST api/pet/deworming
// @desc Create new pet deworming

router.post('/add', auth, Deworming.addDeworming);

// @route PUT api/pet/deworming
// @desc Update deworming of a pet

router.put('/edit/:id', auth, Deworming.updateDeworming);

// @route PUT api/pet/deworming
// @desc Delete deworming item of a pet

router.delete('/:id', auth, Deworming.deleteDeworming);

module.exports = router;