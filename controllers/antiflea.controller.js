const Pet = require('../models/pet.model');
const Antiflea = require('../models/antiflea.model');

module.exports = {

    // Find all antiflea items of a pet

    findAntifleaByPetId: async (req, res) => {
        try {
            const antifleas = await Pet.findById(req.body.id)
            res.status(200).send(antifleas)
        } catch (error) {
            return res.status(400).send({message: 'Impossible de récupérer les données de cet animal'})
        }
    },

    addAntiflea: async (req, res) => {
        try {
            const newAntiflea = await Antiflea.create({
                pet_id: req.body.pet_id,
                antifleaDate: req.body.antifleaDate,
                antifleaName: req.body.antifleaName
            });
            console.log('REQ BODY IN ADD ANTIFLEA', req.body)
        
            // find the pet and add new antiflea item in antiflea array
            const petById = await Pet.findByIdAndUpdate(newAntiflea.pet_id, {
                $push: { antiflea: newAntiflea._id}}, {new: true}).populate({path: 'antiflea', model: 'antiflea'})
            await petById.save();
            res
            .status(200)
            .send(petById)
        } catch (error) {
            return res.status(400).send({message: 'Les données sont manquantes ou ne sont pas au bon format'})
        }
    },

    updateAntiflea: async (req, res) => {
        const id = req.params.id;
        try {
            const antifleaToUpdate = await Antiflea.findByIdAndUpdate(id, req.body);
            res.status(200).send(antifleaToUpdate);
        } catch (error) {
            return res.status(400).send({message: 'Impossible de mettre à jour cet item d\'anti-puces'})
        }
    },

    deleteAntiflea: async (req, res) => {
        try {
            const _id = req.params.id;

            const antifleaToDelete = await Antiflea.findById(_id)
            const petById = await Pet.findByIdAndUpdate(antifleaToDelete.pet_id, {
                $pull: {antiflea: _id}}, {new: true}).populate({path: 'antiflea', model: 'antiflea'})
            
            await petById.save();
            await antifleaToDelete.remove();
            const filteredPet = petById.populate({path: 'antiflea', model: 'antiflea'});
            console.log('FILTERED PET ', filteredPet);
            res.status(200).send(filteredPet);
        } catch (error) {
            return res.status(400).send({message: 'Impossible de supprimer cet item'})
        }
    }
}