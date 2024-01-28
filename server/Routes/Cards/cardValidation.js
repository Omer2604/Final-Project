const Joi = require("joi");

function validateCard(card) {
  const schema = Joi.object({
    title: Joi.string().min(2).max(256).required(),
    description: Joi.string().min(2).max(1024).required(),
    url: Joi.string().min(6).max(1024),
    alt: Joi.string().min(2).max(256),
  });
  return schema.validate(card);
}

exports.validateCard = validateCard;
