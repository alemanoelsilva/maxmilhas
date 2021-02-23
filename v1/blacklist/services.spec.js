const servicesWrapper = require('./services');

describe('Blacklist Services Unit tests', () => {
  const dependencies = {
    documentValidator: {
      cpf: { isValid: jest.fn(documentNumber => documentNumber === 'cpf') },
      cnpj: { isValid: jest.fn(documentNumber => documentNumber === 'cnpj') },
    },
    logger: {
      error: jest.fn(),
    },
  };

  beforeEach(() => jest.clearAllMocks());

  describe('Smoking Tests', () => {
    test('Should return the dependencies functions', () => {
      const { validateCpfCnpj } = servicesWrapper(dependencies);

      expect(validateCpfCnpj).toBeInstanceOf(Function);
    });
  });

  describe('Run the validateCpfCnpj function', () => {
    const cpf = 'cpf';
    const cnpj = 'cnpj';

    test('Should return true when cpf is valid', async () => {
      const response = await servicesWrapper(dependencies).validateCpfCnpj(cpf);

      expect(response).toBeTruthy;
      expect(dependencies.logger.error).toBeCalledTimes(0);
    });

    test('Should return true when cnpj is valid', async () => {
      const response = await servicesWrapper(dependencies).validateCpfCnpj(cnpj);

      expect(response).toBeTruthy;
      expect(dependencies.logger.error).toBeCalledTimes(0);
    });

    test('Should return false when cpf and cnpj are not valid', async () => {
      const response = await servicesWrapper(dependencies).validateCpfCnpj('no_cpf/cnpj_valid_number');

      expect(response).toBeFalsy;
      expect(dependencies.logger.error).toBeCalledTimes(1);
    });
  });
});
