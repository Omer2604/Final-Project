const Joi = require("joi-browser");

function validateForgotPassword(data) {
  console.log("Validating forgot password data:", data);

  const schema = Joi.object({
    email: Joi.string().email().required(),
  });

  const validationResult = schema.validate(data);

  if (validationResult.error) {
    console.log("Validation error:", validationResult.error.details[0].message);
  }

  return validationResult;
}

module.exports = {
  validateForgotPassword,
};
