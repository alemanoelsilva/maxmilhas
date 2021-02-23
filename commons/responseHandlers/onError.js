const logger = require('../../config/logger');
const getCustomError = require('../getCustomError');

exports.onError = response => (error) => {
  const customError = getCustomError(error);

  logger.error({ err: customError });

  response.status(customError.statusCode).json({ message: customError.message }).end();
};
