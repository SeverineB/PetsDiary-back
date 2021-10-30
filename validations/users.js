const Joi = require('joi');

const authSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().min(5).pattern(new RegExp('^[a-zA-Z0-9][!@#$%¨&*]{5,30}$'))
})

module.exports = {
  authSchema
}