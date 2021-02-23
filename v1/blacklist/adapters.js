module.exports = (responseHandlers, useCase, setRequestEnding) => {
  const {
    onSuccess,
    onError,
  } = responseHandlers;

  return ({
    addCpfToBlacklist: (request, response) => useCase.addCpfToBlacklist({
      payload: request.body,
      onSuccess: onSuccess(response),
      onError: onError(response),
    }),

    getBlacklistByCpf: (request, response) => {
      setRequestEnding(request, response);

      return useCase.getBlacklistByCpf({
        query: request.params,
        onSuccess: onSuccess(response),
        onError: onError(response),
      });
    },

    removeBlacklistByCpf: (request, response) => {
      setRequestEnding(request, response);

      return useCase.removeBlacklistByCpf({
        query: request.params,
        onSuccess: onSuccess(response),
        onError: onError(response),
      });
    },
  });
};
