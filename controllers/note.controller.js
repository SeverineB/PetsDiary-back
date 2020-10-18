const Pet = require('../models/pet.model');
const Health = require('../models/note.model');

module.exports = {

  // Get all the pets notes

  findAll: async (req, res) => {
    try {
      const notes = await Note.find({})
      res.send(notes)
    } catch (error) {
      res.status(500).send()
    }
  },

  // Get notes by pet

  findPetsByUser: async (req, res) => {
    try {
      console.log('je suis dans le try de find pets by user');
      const { id } = req.body;
      console.log('ID ', id)
      const pets = await Pet.find({user_id: id})
      res.send(pets)
    } catch (error) {
      res.status(500).send({message: 'Impossible de récupérer les animaux de cet utilisateur'})
    }
  },

  // Create new note

  addNote: async (req, res) => {
   try {
    const { pet_id, birthdate, height, weight, sex, tatto } = req.body;
    const newNote = await Note.create({
       
    });
    await newNote.save();

    const userById = await User.findById(newPet.user_id);
    userById.pets.push(newPet);
    await userById.save();

    res.send(newPet);
   }
   catch (error) {
     res.status(401).send({message: 'impossible de créer l\'animal'});
   }
  },
}
