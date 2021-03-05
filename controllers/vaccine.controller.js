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
        const petById = await Pet.findByIdAndUpdate(newVaccine.pet_id, {
            $push: { vaccine: newVaccine._id}}, {new: true}).populate({path: 'vaccine', model: 'vaccine'})
        await petById.save();
        res
        .status(200)
        .send(petById)
        } catch (error) {
            return res.status(400).send({message: 'Impossible d\'ajouter ce vaccin'})
        }
    },

    updateVaccine: async (req, res) => {
        const id = req.params.id;
        try {
        const vaccineToUpdate = await Vaccine.findByIdAndUpdate(id, req.body);

        res.status(200).send(vaccineToUpdate);
        } catch (error) {
        res.status(400).send({message: 'Impossible de mettre à jour ce vaccin'})
        }
    },

    deleteVaccine: async (req, res) => {
        try {
            console.log('je suis dans delete vaccine')
            const _id = req.params.id;

            const vaccineToDelete = await Vaccine.findById(_id)
            const petById = await Pet.findByIdAndUpdate(vaccineToDelete.pet_id, {
                $pull: {vaccine: _id}}, {new: true}).populate({path: 'vaccine', model: 'vaccine'})
            
            await petById.save();
            await vaccineToDelete.remove();
            const filteredPet = petById.populate({path: 'vaccine', model: 'vaccine'});
            console.log('FILTERED PET ', filteredPet);
            res.status(200).send(filteredPet);
        } catch (error) {
            return res.status(400).send({message: 'Impossible de supprimer cet item'})
        }
    }
}