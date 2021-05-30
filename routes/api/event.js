const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth');
const multer = require('../../middlewares/multer');

const Event = require('../../controllers/event.controller');

// @route GET api/event with async await function

router.get('/', Event.findAll);

// @route GET api/event

router.get('/:id', Event.findById);

// @route POST api/event
// @desc Create an event

router.post('/add', auth, multer, Event.addEvent);

// @route PATCH api/event
// @desc Update a event

router.put('/edit/:id', auth, Event.updateEvent);

// @route DELETE api/event
// @desc Delete a event

router.delete('/:id', auth, Event.deleteEvent);

module.exports = router;