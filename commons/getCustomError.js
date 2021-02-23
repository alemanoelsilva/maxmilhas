const getCustomError = error => ({
  message: error.message,
  statusCode: error.status || error.statusCode || 500,
});

module.exports = getCustomError;
