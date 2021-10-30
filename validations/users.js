const Joi = require('joi');

const pattern = "/(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[$@$!#.])[A-Za-zd$@$!%*?&.]{8,20}/";

const authSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().min(5).pattern(new RegExp(pattern))
})

module.exports = {
  authSchema
}