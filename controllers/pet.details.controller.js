const ObjectID = require('mongodb').ObjectID;
const Pet = require('../models/pet.model');
const PetDetails = require('../models/pet.details.model');

module.exports = {

  // Get the details of all pets

  findAll: async (req, res) => {
    try {
      const petDetails = await PetDetails.find({}).populate('pets')
      res.send(petDetails)
    } catch (error) {
      console.log(error.message);
      res.status(404).send({message: 'Impossible de récupérer les détails des animaux'})
    }
  },

  // Update details of a pet

/*   updatePetDetailsByIdOfPet: async (req, res) => {
    console.log('PET DETAILS DATA TO UPDATE', req.body);
    console.log('PET DETAILS WEIGHT DATE TO UPDATE', req.body.wValue);
    console.log('PET DETAILS WEIGHT VALUE TO UPDATE', req.body);
    console.log('PARAMS ID ', req.params.id);
    const id = req.params.id;
    const dataToUpdate = {
    birthdate: req.body.birthdate,
      sex: req.body.sex,
      ide: req.body.ide,
      // use $addToSet to push new object in each array
     $push: {weight: {wValue: req.body.wValue, wDate: req.body.wDate}},
      $addToSet: {vaccine: req.body.vaccine},
      $addToSet: {deworming: req.body.deworming},
      $addToSet: {antiflea: req.body.antiflea},
    };
    try {
      const petDetailsToUpdate = await PetDetails.findByIdAndUpdate(
      {id}, 
      {
        $addToSet: {weight: {wValue: req.body.wValue, wDate: req.body.wDate}}
      });
      const petDetailsToUpdate = await PetDetails.findOneAndUpdate({id},
        {$set: {"weight.$[date].value": }})
      console.log('details to update', petDetailsToUpdate);
     
      // join pet_details and pet
      const petById = await Pet.findOneAndUpdate({_id: petDetailsToUpdate.pet_id}, {pet_details: petDetailsToUpdate}, {new: true});
      console.log(petById);
      await petById.save();
      res.status(200).send(petDetailsToUpdate);
    }
    catch (error) {
      res.status(400).send({message: 'Impossible de modifier les infos de cet animal'});
    }
}, */

updatePetDetailsByIdOfPet: async (req, res) => {

  const id = req.params.id;
  console.log('PET DETAILS ID', id)
  console.log('DATA TO UPDATE', req.body);
  try {
    const petDetailsToUpdate = await PetDetails.findByIdAndUpdate(
      {id},
      {
        $addToSet: {weight: {weightValue: req.body.weightValue, weightDate: req.body.weightDate}},
        $addToSet: {vaccine: {vaccineDate: req.body.vaccineDate, vaccineName: req.body.vaccineName}},
      });
   /*  const weight = petDetailsToUpdate.weight;
    console.log('WEIGHT', weight);
    weight.push({
      wValue: req.body.wValue,
      wDate: req.body.wDate
    }) */

    /* const updatedData = await petDetailsToUpdate.save();
    console.log('UPDATED DATA', updatedData); */
    res.status(200).send(petDetailsToUpdate);
  }
  catch (error) {
    res.status(400).send({message: 'Impossible de modifier les infos de cet animal'});
  }
},

  // Add pet details

  add: async (req, res) => {
    try {
      console.log('REQ BODY DANS ADD PET DETAILS', req.body);

      if (req.body == '') {
        return res.status(400).send({message: 'Les données sont manquantes'})
      }
      console.log('PET DETAILS PET ID', req.body.pet_id)

      const newPetDetails = await PetDetails.create({ 
        pet_id: req.body.pet_id,
        ide: req.body.ide,
        birthdate: req.body.birthdate,
        sex: req.body.sex,
        weight: {weightDate: req.body.weightDate, weightValue: req.body.weightValue},
        vaccine: {vaccineDate: req.body.vaccineDate, vaccineName: req.body.vaccineName},
        deworming: {dewormingDate: req.body.dewormingDate, dewormingName: req.body.dewormingName},
        antiflea: {antifleaDate: req.body.antifleaDate, antifleaName: req.body.antifleaName},
      });
      console.log('NEW PET DETAILS', newPetDetails)
      // join pet_details and pet
      const petById = await Pet.findOneAndUpdate({_id: newPetDetails.pet_id}, {pet_details: newPetDetails}, {new: true});
      console.log(petById);
      await petById.save();
      res
      .status(200)
      .send(petById);
    }
    catch (error) {
      console.log(error.message);
      return res.status(400).send({message: 'Les données sont manquantes ou ne sont pas au bon format'})
    }
  },
}
