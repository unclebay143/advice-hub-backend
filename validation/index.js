const Joi = require("joi");

// Registration validation
const validateNewAdvice = (data) => {
  const newAdviceSchema = Joi.object({
    heading: Joi.string()
      .min(10)
      .message("advice heading too short 😫")
      .max(65)
      .message("advice description too long 😫")
      .required(),
    description: Joi.string()
      .min(15)
      .message("description too short 😫")
      .required(),
  });

  return newAdviceSchema.validate(data);
};

module.exports.validateNewAdvice = validateNewAdvice;
