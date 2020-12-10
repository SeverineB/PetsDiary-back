const Pet = require('../models/pet.model');
const Weight = require('../models/weight.model');

module.exports = {

  // Find all weight of a pet

    findWeightByPetId: async (req, res) => {
        try {
        const weights = await Pet.findById(req.body.id)
        res.status(200).send(weights)
        } catch (error) {
        return res.status(400).send({message: 'Impossible de récupérer les données de cet animal'})
        }
    },

    addWeight: async (req, res) => {
        try {
            const newWeight = await Weight.create({
                pet_id: req.body.pet_id,
                weightValue: req.body.weightValue,
                weightDate: req.body.weightDate
            });
            console.log('REQ BODY IN WEIGHT', req.body)
            /* const petById = await Pet.findOneAndUpdate({_id: newWeight.pet_id}, {weight: newWeight}, {new: true}); */
            const petById = await Pet.findByIdAndUpdate(newWeight.pet_id, { $push: { weight: newWeight._id}})
            await petById.save();
            res
            .status(200)
            .send(petById)
        } catch (error) {
            return res.status(400).send({message: 'Les données sont manquantes ou ne sont pas au bon format'})
        }
    },

    updateWeight: async (req, res) => {
        const id = req.params.id;
        try {
        const weightToUpdate = await Weight.findByIdAndUpdate(id, req.body);

        res.status(200).send(weightToUpdate);
        } catch (error) {
        res.status(400).send({message: 'Impossible de mettre à jour cet item de poids'})
        }
    },

    deleteWeight: async (req, res) => {
        try {
            const _id = req.params.id;
            const weightToDelete = await Weight.findById(_id)
            weightToDelete.remove()
            res.status(204).send({message: 'Item supprimé'});
        } catch (error) {
            return res.status(400).send({message: 'Impossible de supprimer cet item'})
        }
    }
}