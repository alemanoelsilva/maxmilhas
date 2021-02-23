
const invalidDocumentNumber = onError => onError({
  status: 400,
  message: 'invalid document',
});

const documentIsAlreadyRegistered = onError => onError({
  status: 405,
  message: 'document is already registered',
});

module.exports = (dependencies) => {
  const {
    logger,
    repository,
    services,
  } = dependencies;

  const addCpfToBlacklist = async (deps) => {
    const {
      payload,
      onSuccess,
      onError,
    } = deps;

    try {
      logger.info(`Adding CPF: ${payload.cpf} to the Blacklist`);

      if (!services.validateCpfCnpj(payload.cpf)) {
        return invalidDocumentNumber(onError);
      }

      if (await repository.findOne({ cpf: payload.cpf })) {
        return documentIsAlreadyRegistered(onError);
      }

      await repository.save(payload);

      return onSuccess({
        statusCode: 201,
        data: { message: 'CPF was added successfully' },
      });
    } catch (error) {
      return onError(error);
    }
  };

  const getBlacklistByCpf = async (deps) => {
    const {
      query,
      onSuccess,
      onError,
    } = deps;

    try {
      logger.info(`Verifying CPF: ${query.cpf} on the Blacklist`);

      const blacklistStatus = await repository.find(query);

      return onSuccess({
        data: { status: blacklistStatus.length ? 'BLOCK' : 'FREE' },
      });
    } catch (error) {
      return onError(error);
    }
  };

  const removeBlacklistByCpf = async (deps) => {
    const {
      query,
      onSuccess,
      onError,
    } = deps;

    try {
      logger.info(`Removing CPF: ${query.cpf} from Blacklist`);

      await repository.remove(query);

      return onSuccess({
        data: { message: 'CPF was removed successfully' },
      });
    } catch (error) {
      return onError(error);
    }
  };

  return {
    addCpfToBlacklist,
    getBlacklistByCpf,
    removeBlacklistByCpf,
  };
};
