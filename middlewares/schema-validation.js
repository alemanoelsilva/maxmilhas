const logger = require('../config/logger');

exports.requestValidation = ({ schema, requestType }) => async (request, response, next) => {
  try {
    const value = await schema.validateAsync(request[requestType]);
    request[requestType] = value;

    return next();
  } catch (error) {
    const customError = {
      message: error.message,
      status: 422,
    };

    logger.error({ err: customError }, 'Error on Joi validation');

    return next(customError);
  }
};
