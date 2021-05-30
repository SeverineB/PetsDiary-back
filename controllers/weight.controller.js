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
            const { pet_id, weightValue, weightDate } = req.body
            if (!pet_id|| !weightValue || ! weightDate) {
                return res.status(400).send({message: 'Tous les champs doivent être renseignés'})
            }
            
            const newWeight = await Weight.create({
                pet_id,
                weightValue,
                weightDate
            });
            const petById = await Pet.findByIdAndUpdate(newWeight.pet_id, {
                $push: { weight: newWeight._id}}, {new: true}).populate({path: 'weight', model: 'weight'})
            await petById.save()
            res
            .status(200)
            .send(petById)
        } catch (error) {
            return res.status(400).send({message: 'Les données sont manquantes ou ne sont pas au bon format'})
        }
    },

    updateWeight: async (req, res) => {
        const id = req.params.id
        try {
            const weightToUpdate = await Weight.findByIdAndUpdate(id, req.body)
            return res.status(200).send(weightToUpdate);
        } catch (error) {
            return res.status(400).send({message: 'Impossible de mettre à jour cet item de poids'})
        }
    },

    deleteWeight: async (req, res) => {
        try {
            const _id = req.params.id

            const weightToDelete = await Weight.findById(_id)
            const petById = await Pet.findByIdAndUpdate(weightToDelete.pet_id, {
                $pull: {weight: _id}}, {new: true}).populate({path: 'weight', model: 'weight'})
            
            await petById.save();
            await weightToDelete.remove();
            const filteredPet = petById.populate({path: 'weight', model: 'weight'})
            res.status(200).send(filteredPet);
        } catch (error) {
            return res.status(400).send({message: 'Impossible de supprimer cet item'})
        }
    }
}