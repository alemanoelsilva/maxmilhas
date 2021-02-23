module.exports = (responseHandlers, useCase) => ({
  getServerStatus: (request, response) => useCase.getServerStatus({
    onSuccess: responseHandlers.onSuccess(response),
    onError: responseHandlers.onError(response),
  }),
});
