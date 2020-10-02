const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { authSchema } = require('../../validations/users');

module.exports = {

  // Get all the users
  // Use async await functions 
  findAll: async (req, res) => {
    try {
      const users = await User.find({})
      res.send(users)
    } catch (error) {
      res.status(500).send()
    }
  },

  // Create new user

  createOne: async (req, res) => {
    try {
      // destructuring request body
      const { username, email, password } = req.body;
      // validate with Joi schema
      const result = await authSchema.validateAsync(req.body);
      // check if email doesn't already exist on db
      const alreadyExist = await User.findOne({ email: email });
      if (alreadyExist){
        throw new Error('Cet email existe déjà !');
        /* res.status(422).send('Cet email existe déjà !').end(); */
      }
      // if everything ok create new user
      const newUser = await User.create({
        email,
        password: bcrypt.hashSync(password, 10),
        username,
      })
      await newUser.save();
      /* res.send(newUser); */
      res.status(200).json({ 
        isLogged: true,
        session: {
          _id: newUser._id,
          username: newUser.username,
          }
      })
    } catch (error) {
      if (error.isJoi === true ) {
        /* res.status(422, error.message).end(); */
        throw new Error('Les valeurs ne sont pas correctes !')
      } else {
        res.status(401, error.message).end();
      }
    }
  },

  findById: async (req, res) => {
    const user = await User.findById(req.params.id);
    res.send(user);
  },

  // Log in a user

  login: async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email});
    if (!user) {
      res.status(401).send({ 
        error: {
          message: 'Mauvais email !'
        }
      });
    } else {

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).send({ 
        error: {
          message: 'Mauvais mot de passe !'
        }
      });
    }  else {
      const token = jwt.sign({ id: user._id }, 'secretkey', { expiresIn: 86400});
      res.status(200).json({
        isLogged: true,
        token,
        session: {
          _id: user._id,
          username: user.username,
          }
        })
      }
    }
  },

  // Check if a user is logged

  checkIsLogged: async (req, res) => {
    try {
      const decoded = jwt.verify(req.body.token, 'secretkey');
      
      const user = await User.findOne({
        _id: req.body.id,
      });
      if (!user) {
        res.status(401).send('Cet utilisateur n\'existe pas !')
      }
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
  }
}