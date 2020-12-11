const Pet = require('../models/pet.model');
const Deworming = require('../models/deworming.model');

module.exports = {

    // Find all deworming items of a pet

    findDewormingByPetId: async (req, res) => {
        try {
        const dewormings = await Pet.findById(req.body.id)
        res.status(200).send(dewormings)
        } catch (error) {
        return res.status(400).send({message: 'Impossible de récupérer les données de cet animal'})
        }
    },

    addDeworming: async (req, res) => {
        try {
        const newDeworming = await Deworming.create({
            pet_id: req.body.pet_id,
            dewormingDate: req.body.dewormingDate,
            dewormingName: req.body.dewormingName
        });
        console.log('REQ BODY IN ADD DEWORMING', req.body)
    
        // find the pet and add new deorming item in deworming array
        const petById = await Pet.findByIdAndUpdate(newDeworming.pet_id, { $push: { deworming: newDeworming._id}})
        await petById.save();
        res
        .status(200)
        .send(petById)
        } catch (error) {
            return res.status(400).send({message: 'Les données sont manquantes ou ne sont pas au bon format'})
        }
    },

    updateDeworming: async (req, res) => {
        const id = req.params.id;
        try {
        const dewormingToUpdate = await Deworming.findByIdAndUpdate(id, req.body);

        res.status(200).send(dewormingToUpdate);
        } catch (error) {
            return res.status(400).send({message: 'Impossible de mettre à jour cet item de vermifuge'})
        }
    },

    deleteDeworming: async (req, res) => {
        try {
            const _id = req.params.id;
            const dewormingToDelete = await Deworming.findById(_id)
            
            const petById = await Pet.findByIdAndUpdate(dewormingToDelete.pet_id, {
                $pull: {deworming: _id}
            })
            await petById.save();
            await dewormingToDelete.remove()
            res.status(204).send({message: 'Item supprimé'});
        } catch (error) {
            return res.status(400).send({message: 'Impossible de supprimer cet item de vermifuge/*0'})
        }
    }
}