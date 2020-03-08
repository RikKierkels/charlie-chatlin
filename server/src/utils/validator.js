const joi = require('@hapi/joi');

function toStringValidationMessages(field, max) {
  return {
    'string.base': `${field} should be a type of 'text.'`,
    'string.empty': `${field} cannot be an empty field.`,
    'string.max': `${field} has a maximum length of ${max}.`,
    'any.required': `${field} is a required field.`
  };
}

function toNumberValidationMessages(field) {
  return {
    'number.base': `${field} is not a valid number or could not be cast to a valid number.`,
    'number.integer': `${field} is not a valid integer.`
  };
}

const messageSchema = joi
  .string()
  .trim()
  .max(1000)
  .required()
  .messages(toStringValidationMessages('Message', 1000));

const userSchema = joi.object({
  username: joi
    .string()
    .trim()
    .max(100)
    .required()
    .messages(toStringValidationMessages('Username', 100)),
  avatarId: joi
    .string()
    .trim()
    .max(250)
    .required()
    .messages(toStringValidationMessages('AvatarId', 250))
});

const subscriptionSchema = joi.object({
  endpoint: joi
    .string()
    .max(2048)
    .required()
    .messages(toStringValidationMessages('Endpoint', 2048)),
  expirationTime: joi
    .number()
    .integer()
    .allow(null)
    .messages(toNumberValidationMessages('ExpirationTime')),
  keys: joi.object({
    p256dh: joi
      .string()
      .max(250)
      .required()
      .messages(toStringValidationMessages('P256dh', 250)),
    auth: joi
      .string()
      .max(200)
      .required()
      .messages(toStringValidationMessages('Auth', 200))
  })
});

function toErrorMessage(error) {
  return error.details.map(detail => detail.message).join(' & ');
}

module.exports = {
  validateMessage: msg => messageSchema.validate(msg),
  validateUser: user => userSchema.validate(user),
  validateSubscription: sub => subscriptionSchema.validate(sub),
  toErrorMessage
};
