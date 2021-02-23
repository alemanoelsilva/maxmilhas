exports.error = (error, request, response) => response.status(error.status || 500).json({
  message: error.message || 'Internal Server Error',
});
