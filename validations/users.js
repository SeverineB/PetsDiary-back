const Joi = require('joi');

const authSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  username: Joi.string().alphanum().min(4).max(30).required(),
  password: Joi.string()
  .pattern(new RegExp('^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{5,30}$'))
})

module.exports = {
  authSchema
}