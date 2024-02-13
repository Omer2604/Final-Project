const Joi = require("joi");

const validateForgotPassword = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
  });

  return schema.validate(data, { abortEarly: false });
};

module.exports = validateForgotPassword;
