const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { authSchema } = require('../validations/users');

module.exports = {

  // Get all the users
  // Use async await functions

  findAll: async (req, res) => {
    console.log('je suis dans find user');
    try {
      const users = await User.find({})
      res.send(users)
    } catch (error) {
      res.status(500).send()
    }
  },

  // Create new user

  register: async (req, res) => {
    console.log('je suis dans REGISTER');
    try {
      // destructuring request body
      const { username, email, password } = req.body;
      if (!email || !password || !username) {
        res.status(401).send({message: 'Tous les champs doivent être renseignés'})
      }

      // validate with Joi schema
      const result = await authSchema.validateAsync(req.body);
      const { error, value } = result;
      if (error) {
        res.status(401).send({message: error.message})
      }

      // check if email doesn't already exist on db
      const alreadyExist = await User.findOne({ email: email });
      if (alreadyExist){
        res.status(401).send('Cet email existe déjà !').send();
      }

      // if everything ok create new user
      const newUser = await User.create({
        email,
        password: bcrypt.hashSync(password, 10),
        username,
      })
      await newUser.save();
      res.status(200).send({message: 'Utilisateur enregistré dans la base !'})
    } catch (error) {
      if (error.isJoi === true ) {
        res.status(422, error.message).send({message: 'Les valeurs ne sont pas correctes'});
      } else {
        res.status(401, error.message).end();
      }
    }
  },

  // Find user by ID

  findById: async (req, res) => {
    const user = await User.findById(req.params.id);
    res.send(user);
  },

  // Connect a user

  login: async (req, res) => {

    try {
      console.log('je suis dans login');
      const { email, password } = req.body;

      // validate with Joi schema
     /*  const result = await authSchema.validateAsync(req.body);
      const { error, value } = result;
      if (error) {
        res.status(401).send({message: error.message})
      } */

      const user = await User.findOne({ email: email});
      if (!user) {
        console.log('je suis dans no user error')
        res.status(401).send({ 
          error: {
            message: 'Mauvais email !'
          }
        });
      }
      else {
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        res.status(401).send({ 
          error: {
            message: 'Mauvais mot de passe !'
          }
        });
      }
   
      console.log('je suis avant la création du token')
      const token = jwt.sign({
        id: user._id,
        username: user.username
      },
        'secretkey',
        {expiresIn: 1000 * 60 * 60 * 24}
      );

      // store token in db to have a double authentication check
      user.token = token;
      await user.save();
  
      console.log('je vais envoyer le cookie');
      // send the token in a cookie
      res.cookie('token', token, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
        httpOnly:true,
        path: '/'
      }).send({
        isLogged: true,
        session: {
          _id: user._id,
          username: user.username,
          }
        });
      }
    }
    catch (error) {
      res.status(500).send({
        error: {
          message: 'Impossible d\'exécuter la requête !'}
        })
    }
  },

  // Find all the pets of a user

  getAllPets: async (req, res) => {
    try {
      console.log('je suis dans le try de findAllPetsOfUser')
      console.log('REQ PARAMS ID', req.params.id)
      const user = await User.findById(req.params.id)
      // use deep populate to retrieve all the pets of user with all the collections in ref
      .populate({
        path: 'pets',
        populate: {
          path: 'weight', 
          model: 'weight'
        }
      })
      .populate({
        path: 'pets',
        populate: {
          path: 'vaccine',
          model: 'vaccine'
        }
      })
      .populate({
        path: 'pets',
        populate: {
          path: 'deworming',
          model: 'deworming'
        }
      })
      .populate({
        path: 'pets',
        populate: {
          path: 'antiflea',
          model: 'antiflea'
        }
      })
      const newUserPets = await Promise.all(user.pets.map(async (pet) => (
        // add a new property to each pet with value equal to real url of each avatar
        {...pet.toObject(),
          avatarUrl: `${process.env.PROTOCOL}://${process.env.HOST}:${process.env.PORT}/${pet.avatarPath.replace('upload\\avatars\\', 'upload/avatars/')}`
        }
        )))
      console.log('NEW USER PETS IN GET ALL PETS', newUserPets);
      res.status(200).send(newUserPets)
    }
    catch (error) {
      return res.status(400).send({message: 'Impossible de récupérer les animaux de ce user'});
    }
  },

  // Check if a user is logged

  checkIsLogged: async (req, res) => {
    res.status(200).send({message: 'utilisateur bien connecté'})
  },

  // Deconnect a user

  logout: async (req, res) => {
    console.log('je suis dans logout');

     const user = await User.findOne({token: req.cookies.token});
    // delete the token stored in db
     user.token = null;
     await user.save();
     // clear cookie in browser
     res.clearCookie('token').send({message: 'Utilisateur déconnecté !'})
  },
}