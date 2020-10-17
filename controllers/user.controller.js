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
      /* res.send(newUser); */
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
      console.log('je suis dans isMatch');
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        res.status(401).send({ 
          error: {
            message: 'Mauvais mot de passe !'
          }
        });
      }
   
      console.log('je suis avant la création du token')
      const token = jwt.sign({ id: user._id }, 'secretkey', {expiresIn: 86400});
  
      // send the token in a cookie
      res.cookie('token', token, {maxAge: 86400, httpOnly:true, path: '/'}).send({
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

  findAllPetsOfUser: async (req, res) => {
    const { id } = req.body;
    console.log('REQ BODY ID', req.body.id);
    try {
      console.log('je suis dans le try')
      const user = await User.findOne({_id: req.params.id}).populate('pets');
      console.log('USER ', user)
      res.send(user.pets)

    }
    catch (error) {
      res.status(401).send({message: 'Impossible de récupérer les animaux de cet utilisateur'});
    }
  },

  // Check if a user is logged

  checkIsLogged: async (req, res) => {
    const token = req.cookies.token;
    if (!token)
      res.status(401).send({message: 'Il n\'y a pas de token !'})
    try {
      const decoded = jwt.verify(req.body.token, 'secretkey');
      
      const user = await User.findOne({_id: req.body.id});
      if (!user) {
        res.status(401).send('Cet utilisateur n\'existe pas !')
      }
      req.user = decoded;
      res.send({
        isLogged: true,
        session: {
           _id: user._id,
          username: user.username,
        }
      })
    } catch (error) {
      res.status(401).send('requête impossible');
    }
  },

  logout: async (req, res) => {
      res.send({
        isLogged: false,
        session: {
          _id: "",
          username: "",
        }
      })
  },

  // Find pet by user's ID

  findPetsByUser: async (req, res) => {
    console.log(req.params);
   
  }
}