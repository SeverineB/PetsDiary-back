const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const auth = async (req, res, next) => {

const token = req.cookies.token;

  if (!token)
    return res.status(401).send('Il n\'y a aucun token !');

  try {
    const user = await User.findOne({token: req.cookies.token});
    const decoded = jwt.verify(token,  process.env.PRIVATE_KEY);
    if (req.cookies.token === user.token) {
      console.log('C\'est le bon utilisateur');
      req.user = decoded;
      next();
    }
  } catch (error) {
    res.clearCookie('token');
    return res.status(400).send(error.message);
  }
}

module.exports = auth;