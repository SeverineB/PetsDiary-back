const Pet = require('../models/pet.model');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = {

  // Get all the pets

  findAll: async (req, res) => {
    try {
      const pets = await Pet.find({})
      res.send(pets)
    } catch (error) {
      res.status(500).send()
    }
  },

  // Get pets by user

/*   findPetsByUser: async (req, res) => {
    try {
      console.log('je suis dans le try de find pets by user');
      const { id } = req.params;
      console.log('ID ', id)
      const pets = await Pet.find({user_id: id})
      res.send(pets)
    } catch (error) {
      res.status(500).send({message: 'Impossible de récupérer les animaux de cet utilisateur'})
    }
  }, */

  // Create new pet

  addPet: async (req, res) => {
   try {
    console.log('je suis dans le try de ADDPET');
    console.log('REQ BODY VAUT ', req.body);
    const { name, age, species, breed, user_id } = req.body;
    const newPet = await Pet.create({
      name,
      age,
      species,
      breed,
      user_id,
    });
    await newPet.save();
    console.log('je suis après la sauvegarde en db');
    const userById = await User.findById(newPet.user_id);
    console.log('USER BY ID ', userById);
    userById.pets.push(newPet);
    await userById.save();

    res.send(newPet);
   }
   catch (error) {
     res.status(401).send({message: 'impossible de créer l\'animal'});
   }
  },

  findHealthByPet: async (req, res) => {
    try {

    }
    catch {
      
    }
  }

}
