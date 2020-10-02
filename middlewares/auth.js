const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, 'secretkey');
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token})
    if (!user) {
      res.status(401).send('Problème d\'authentification');
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send('Problème d\'authentification');
  }
}

module.exports = auth;