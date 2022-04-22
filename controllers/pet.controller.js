const Pet = require('../models/pet.model');
const User = require('../models/user.model');
const fs = require('fs');

module.exports = {

    // Get all the pets

    findAll: async (req, res) => {
        try {
            const pets = await Pet.find()
            .populate('weight')
            .populate('vaccine')
            .populate('deworming')
            .populate('antiflea')
            .populate('events')
            res.send(pets)
        } catch (error) {
            return res.status(404).send({message: 'Impossible de récupérer les animaux'})
        }
    },

    // Find pet by ID

    findById: async (req, res) => {
        try {
        const pet = await Pet
        .findById(req.params.id)
        res.send(pet);
        } catch (error) {
            return res.status(404).send({message: 'Impossible de récupérer cet animal'})
        }
    },

    // Create new pet

    addPet: async (req, res) => {
        try {
            const { user_id, name, age, species, breed, sex, birthdate, ide } = req.body
            const avatarPath = req.file.path
          if (process.env.NODE_ENV === "development") {
            const avatarUrl = `${process.env.BACKEND_URL}/${req.file.filename}`
        } else if (process.env.NODE_ENV === "production") {
            const avatarUrl = `http://pets-diary-server.severinebianchi.com/${avatarPath}`

        }

            const newPet = await Pet.create({
                user_id,
                name,
                age,
                species,
                breed,
                sex,
                birthdate,
                ide,
                avatarPath,
            });
            await newPet.save()

            const userById = await User.findByIdAndUpdate(newPet.user_id, {
                $push: { pets: newPet._id}
            })

            await userById.save()
            res.status(200).send({
            newPet
            });
        }
        catch (error) {
          console.log('error when creating new pet', error)
            return res.status(400).send({message: 'impossible de créer l\'animal'})
        }
    },

    updatePet: async (req, res) => {
        const datas = req.body
        if (req.file) {
            datas.avatarPath = req.file.path
        }
        const id = req.params.id

        try {
            const petToUpdate = await Pet.findByIdAndUpdate(id, datas, {new: true})
            if (req.file) {
                const avatarUrl = `${process.env.PROTOCOL}://${process.env.HOST}:${process.env.PORT}/${req.file.filename}`
            }
            res.status(201).send(petToUpdate)
        }
        catch (error) {
            console.log('error update', error)
            return res.status(400).send({message: 'Impossible de modifier les infos de cet animal'});
        }
    },

    deletePet: async (req, res) => {
        try {
            const _id = req.params.id
            const petToDelete = await Pet.findById(_id)
            fs.unlink(petToDelete.avatarPath, (error) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log('fichier supprimé en file system')
                }
            })

            const userById = await User.findByIdAndUpdate(petToDelete.user_id, {
                $pull: {pets: _id}
            },
            {new: true})
            await userById.save()

            await petToDelete.remove()

            res.status(204).send({message: 'Animal supprimé'});
        } catch (error) {
            return res.status(400).send({message: 'Impossible de supprimer cet animal'})
        }
    },

    // Find all the events of a pet

    getAllEvents: async (req, res) => {
        try {

            const pet = await Pet.findById(req.params.id).populate('events')

            const events = await Promise.all(pet.events.map(async (event) => {
                return event
            }))

            return res.status(200).send({events: pet.events, petName: pet.name})
        }
        catch (error) {
            return res.status(400).send({message: 'Impossible de récupérer les évènements de cet animal'});
        }
    },
}
