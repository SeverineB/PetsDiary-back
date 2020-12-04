const Pet = require('../models/pet.model');
const User = require('../models/user.model');

module.exports = {

  // Get all the pets

  findAll: async (req, res) => {
    try {
      const pets = await Pet.find()
      .populate('weight')
      .populate('vaccine')
      .populate('deworming')
      .populate('antiflea');
      console.log('PETS FIND ALL', pets)
      res.send(pets)
    } catch (error) {
      res.status(404).send({message: 'Impossible de récupérer les animaux'})
    }
  },

/*   findAllPetsByUserId: async (req, res) => {
    try {
      const pets = await Pet.find({user_id: req.params.id})
      console.log('PETS OF THE USER', pets)
      res.send(pets)
    }
    catch (error) {
      res.status(404).send({message: 'Impossible de récupérer les animaux de cet utilisateur'})
    }
  }, */

  // Find pet by ID

  findById: async (req, res) => {
    try {
      const pet = await Pet
      .findById(req.params.id)
      console.log('PETS FIND ONE', pet)
      res.send(pet);
    } catch (error) {
      res.status(404).send({message: 'Impossible de récupérer cet animal'})
    }
  },

  // Create new pet

  addPet: async (req, res) => {
   try {
      console.log('je suis dans addPet');
      console.log('REQ BODY ADD PET', req.body);
      console.log('REQ FILE ADD PET', req.file);
      const { user_id, name, age, species, breed, sex, birthdate, ide } = req.body;
      const avatarPath = req.file.path;
      console.log('REQ FILE PATH', req.file.path);
      const avatarUrl = `${process.env.PROTOCOL}://${process.env.HOST}:${process.env.PORT}/${req.file.filename}`;
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
    await newPet.save();

    const userById = await User.findById(newPet.user_id);
    console.log('USER BY ID ', userById);

    userById.pets.push(newPet);
    await userById.save();

    res.send({
      newPet,
      avatarUrl
    });
   }
   catch (error) {
     res.status(400).send({message: 'impossible de créer l\'animal'});
   }
  },

  updatePet: async (req, res) => {
    console.log('PET ID TO UPDATE', req.body);
    const datas = req.body;
  
    const id = req.params.id;

    try {
       const petToUpdate = await Pet.findByIdAndUpdate(id, datas);

       console.log('pet to update', petToUpdate);

       res.status(201).send(petToUpdate);
    }
    catch (error) {
      res.status(400).send({message: 'Impossible de modifier les infos de cet animal'});
    }
  }
}
