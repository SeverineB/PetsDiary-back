    const User = require('../models/user.model');
    const jwt = require('jsonwebtoken');
    const bcrypt = require('bcryptjs');
    const { authSchema } = require('../validations/users');

    module.exports = {

    // Get all the users

    findAll: async (req, res) => {
        try {
            const users = await User.find({})
            return res.send(users)
        } catch (error) {
            return res.status(500).send()
        }
    },

    // Create new user

    register: async (req, res) => {
        console.log('je suis dans REGISTER');
        try {
            const { username, email, password } = req.body;
            if (!email || !password || !username) {
                return res.status(400).send({message: 'Tous les champs doivent être renseignés'})
            }

            // validate with Joi schema
            const result = await authSchema.validateAsync(req.body);
            const { error, value } = result;
                if (error) {
                    return res.status(400).send({message: 'Les valeurs ne sont pas correctes'})
                }

            const alreadyExist = await User.findOne({ email: email })
                if (alreadyExist){
                    return res.status(401).send({message: 'Cet email existe déjà !'})
                }

            const newUser = await User.create({
                email: email,
                password: bcrypt.hashSync(password, 10),
                username: username,
            })
            await newUser.save()

            return res.status(200).send({
                message: 'L\'utilisateur est bien enregistré dans la base !'
            })
        } catch (error) {
            if (error.isJoi === true ) {
                return res.status(400).send({message: error.message})
            } else {
                return res.status(401).end()
            }
        }
    },

    // Find user by ID

    findById: async (req, res) => {
        const user = await User.findById(req.params.id)
        res.send(user)
    },

    // Connect a user

    login: async (req, res) => {
        try {
            const { email, password } = req.body

            // TODO validate with Joi schema
            /*  const result = await authSchema.validateAsync(req.body);
            const { error, value } = result;
            if (error) {
                res.status(401).send({message: error.message})
            } */

            const user = await User.findOne({ email: email })
                if (!user) {
                    return res.status(401).send({ 
                        message: 'L\'utilisateur n\'existe pas !'
                    })
                }

            const isMatch = await bcrypt.compare(password, user.password)
                if (!isMatch) {
                    return res.status(401).send({ 
                        message: 'Le mot de passe n\est pas correct!'
                    })
                }
        
            const token = jwt.sign({
                id: user._id,
                username: user.username
            },
                'secretkey',
                {expiresIn: 1000 * 60 * 60 * 24}
            )

            // store token in db to have a double authentication check
            user.token = token
            await user.save()
        
            // send the token in a cookie
            return res.cookie('token', token, {
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
                httpOnly:true,
                path: '/'
            }).send({
                isLogged: true,
                session: {
                _id: user._id,
                username: user.username,
                }
            })
            }
        catch (error) {
            return res.status(500).send({
                message: 'Impossible d\'exécuter la requête !'
            })
        }
    },

    // Find all the pets of a user

    getAllPets: async (req, res) => {
        try {

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
            .populate({
                path: 'pets',
                populate: {
                path: 'events',
                model: 'events'
                }
            })
            const newUserPets = await Promise.all(user.pets.map(async (pet) => (
                // add a new property to each pet with value equal to real url of each avatar
                {...pet.toObject(),
                avatarUrl: `${process.env.PROTOCOL}://${process.env.HOST}:${process.env.PORT}/${pet.avatarPath.replace('upload\\avatars\\', 'upload/avatars/')}`
                }
                )))

            return res.status(200).send(newUserPets)
        }
        catch (error) {
            return res.status(400).send({message: 'Impossible de récupérer les animaux de ce user'})
        }
    },

    // Find all the events of a user

    getAllEvents: async (req, res) => {
        try {

            const user = await User.findById(req.params.id).populate('events')
            const userEvents = await Promise.all(user.events.map(async (event) => {
                // convert mongoose obj to allow adding properties
                const eventObj = event.toObject()
                const pet = await Pet.findById(eventObj.pet_id)
                const petName = pet.name
                eventObj.petName = petName
                return eventObj
            }))

            return res.status(200).send(userEvents)
        }
        catch (error) {
            return res.status(400).send({message: 'Impossible de récupérer les évènements de ce user'});
        }
    },

    // Check if a user is logged

    checkIsLogged: async (req, res) => {
        return res.status(200).send({message: 'utilisateur bien connecté'})
    },

    // Deconnect a user

    logout: async (req, res) => {

        const user = await User.findOne({token: req.cookies.token})
        user.token = null
        await user.save()
        return res.clearCookie('token').send({message: 'Utilisateur déconnecté !'})
    },
}