const Pet = require('../models/pet.model');
const User = require('../models/user.model');
const Event = require('../models/event.model');

module.exports = {

    // Get all the events

    findAll: async (req, res) => {
        try {
            const events = await Event.find()
            res.send(events)
        } catch (error) {
            return res.status(404).send({message: 'Impossible de récupérer les évènements'})
        }
    },

    // Find event by ID

    findById: async (req, res) => {
        try {
        const event = await Event
        .findById(req.params.id)
        res.send(event);
        } catch (error) {
            return res.status(404).send({message: 'Impossible de récupérer cet évènement'})
        }
    },

    addEvent: async (req, res) => {
        try {
            const { user_id, start, end, title, address, pet_id } = req.body;
            if (!user_id || !start || !end || !title || !address || !pet_id) {
                return res.status(400).send({message: 'Tous les champs doivent être renseignés'})
            }
            
            const newEvent = await Event.create({
                user_id,
                start,
                end,
                title,
                address,
                pet_id
            })
            const userById = await User.findByIdAndUpdate(newEvent.user_id, {
                $push: { events: newEvent._id}})
            await userById.save();
            const petById = await Pet.findByIdAndUpdate(newEvent.pet_id, {
                $push: { events: newEvent._id}})
            await petById.save();
            res
            .status(200)
            .send(newEvent)
        } catch (error) {
            return res.status(400).send({message: 'Les données sont manquantes ou ne sont pas au bon format'})
        }
    },

    updateEvent: async (req, res) => {
        const id = req.params.id
        try {
            const eventToUpdate = await Event.findByIdAndUpdate(id, req.body)
            return res.status(200).send(eventToUpdate)
        } catch (error) {
            return res.status(400).send({message: 'Impossible de mettre à jour cet évènement'})
        }
    },

    deleteEvent: async (req, res) => {
        try {
            const _id = req.params.id

            const eventToDelete = await Event.findById(_id)
            const petById = await Pet.findByIdAndUpdate(eventToDelete.pet_id, {
                $pull: {event: _id}}, {new: true}).populate({path: 'event', model: 'event'})
            
            await petById.save()
            await eventToDelete.remove()
            const filteredPet = petById.populate({path: 'event', model: 'event'})
            res.status(200).send(filteredPet)
        } catch (error) {
            return res.status(400).send({message: 'Impossible de supprimer cet évènement'})
        }
    }
}