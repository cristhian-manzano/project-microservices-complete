const Joi = require('joi');

const createValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    phone: Joi.string().required()
  });

  return schema.validate(data);
};

module.exports = { createValidation };
