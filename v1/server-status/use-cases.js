module.exports = (dependencies) => {
  const {
    logger,
    repository,
    moment,
    services,
  } = dependencies;

  const getServerStatus = async (deps) => {
    const {
      onSuccess,
      onError,
    } = deps;

    try {
      logger.info('Retrieving server status');

      const uptime = moment.utc(process.uptime() * 1000).format('HH:mm:ss');

      const blacklistCpf = await repository.find();

      const status = await services.retreiveRequestsData();

      return onSuccess({
        data: {
          uptime,
          cpfAmountInBlacklist: blacklistCpf.length,
          status,
        },
      });
    } catch (error) {
      return onError(error);
    }
  };

  return {
    getServerStatus,
  };
};
