const joi = require('@hapi/joi');

const messageSchema = joi
  .string()
  .max(1000)
  .required();

const userSchema = joi.object({
  username: joi
    .string()
    .max(100)
    .required(),
  avatarId: joi.string().max(100)
});

const subscriptionSchema = joi.object({
  endpoint: joi
    .string()
    .max(2048)
    .required(),
  expirationTime: joi
    .number()
    .integer()
    .allow(null),
  keys: joi.object({
    p256dh: joi
      .string()
      .max(250)
      .required(),
    auth: joi
      .string()
      .max(200)
      .required()
  })
});

function toErrorMessage(error) {
  return error.details.map(detail => detail.message).join(' & ');
}

module.exports = {
  messageSchema,
  userSchema,
  subscriptionSchema,
  toErrorMessage
};
