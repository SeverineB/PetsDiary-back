const Pet = require('../../models/Pet');
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

  // Create new pet

  addPet: async (req, res) => {
   try {
    const { name, age, species, breed, user_id } = req.body;
    const newPet = await Pet.create({
      name,
      age,
      species,
      breed,
      user_id,
    })
    await newPet.save();
    const userById = await User.findById(pet.user_id);
    userById.pets.push(pet);
    await userById.save();
    res.send(pet);
   } catch (error){
    throw new Error('Les valeurs ne sont pas correctes !')
   }
},
}
