const Pet = require('../models/pet.model');
const Vaccine = require('../models/vaccine.model');

module.exports = {

    // Find all vaccine items of a pet

    findVaccineByPetId: async (req, res) => {
        try {
        const vaccines = await Pet.findById(req.body.id)
        res.status(200).send(vaccines)
        } catch (error) {
        return res.status(400).send({message: 'Impossible de récupérer les données de cet animal'})
        }
    },

    addVaccine: async (req, res) => {
        try {
        const newVaccine = await Vaccine.create({
            pet_id: req.body.pet_id,
            vaccineDate: req.body.vaccineDate,
            vaccineName: req.body.vaccineName
        });
        
        // find the pet and add new vaccine item in vaccine array with $push
        const petById = await Pet.findByIdAndUpdate(newVaccine.pet_id, { $push: { vaccine: newVaccine._id}})
        await petById.save();
        res
        .status(200)
        .send(petById)
        } catch (error) {
        return res.status(400).send({message: 'Les données sont manquantes ou ne sont pas au bon format'})
        }
    },

    updateVaccine: async (req, res) => {
        const id = req.params.id;
        try {
        const vaccineToUpdate = await Vaccine.findByIdAndUpdate(id, req.body);

        res.status(200).send(vaccineToUpdate);
        } catch (error) {
        res.status(400).send({message: 'Impossible de mettre à jour cet item de vaccin'})
        }
    },

    deleteVaccine: async (req, res) => {
        try {
            const _id = req.params.id;
            const vaccineToDelete = await Vaccine.findById(_id)
            vaccineToDelete.remove()
            res.status(204).send({message: 'Item supprimé'});
        } catch (error) {
            return res.status(400).send({message: 'Impossible de supprimer cet item de vaccin'})
        }
    }
}