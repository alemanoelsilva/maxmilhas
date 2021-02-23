exports.setRequestEnding = insertRequestsData => (request, response) => {
  const { path, method } = request;

  const startTime = Date.now();

  response.on('finish', async () => {
    const duration = Date.now() - startTime;

    await insertRequestsData({ duration, method, path });
  });
};
