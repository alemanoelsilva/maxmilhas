const servicesWrapper = (dependencies) => {
  const {
    logger,
    documentValidator,
  } = dependencies;

  const {
    cpf,
    cnpj,
  } = documentValidator;

  const validateCpfCnpj = (documentNumber) => {
    if (cpf.isValid(documentNumber) || cnpj.isValid(documentNumber)) {
      return true;
    }

    logger.error('CPF/CNPJ is not valid');
    return false;
  };

  return {
    validateCpfCnpj,
  };
};

module.exports = servicesWrapper;
