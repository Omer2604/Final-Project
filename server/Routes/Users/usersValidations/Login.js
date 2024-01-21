const Joi = require("Joi");

function validateLogin(req) {
  const schema = Joi.object({
    email: Joi.string().email().required().label('דוא"ל'),
    password: Joi.string()
      .min(8)
      .regex(/.*[!@#$%^&*()_+\-={}';":|,.<>?].*/)
      .required()
      .label("סיסמה"),
  });

  return schema.validate(req);
}

module.exports = validateLogin;
