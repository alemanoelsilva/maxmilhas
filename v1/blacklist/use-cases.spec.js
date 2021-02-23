const blacklistWrapper = require('./use-cases');

describe('Blacklist Use Case Unit tests', () => {
  const dependencies = {
    repository: {
      findOne: jest.fn(({ cpf }) => Promise.resolve(cpf === 'cpf_into_db')),
      find: jest.fn(({ cpf }) => Promise.resolve(cpf === 'block_cpf' ? [1, 2] : [])),
      save: jest.fn(() => Promise.resolve()),
      remove: jest.fn(() => Promise.resolve()),
    },
    services: {
      validateCpfCnpj: jest.fn(cpf => !(cpf === 'invalid_cpf')),
    },
    logger: {
      info: jest.fn(),
    },
  };

  const errorDependencies = {
    ...dependencies,
    repository: {
      findOne: jest.fn(() => Promise.reject('Error test')),
      find: jest.fn(() => Promise.reject('Error test')),
      remove: jest.fn(() => Promise.reject('Error test')),
    },
  };

  beforeEach(() => jest.clearAllMocks());

  describe('Smoking Tests', () => {
    test('Should return the dependencies functions', () => {
      const {
        addCpfToBlacklist,
        getBlacklistByCpf,
        removeBlacklistByCpf,
      } = blacklistWrapper(dependencies);

      expect(addCpfToBlacklist).toBeInstanceOf(Function);
      expect(getBlacklistByCpf).toBeInstanceOf(Function);
      expect(removeBlacklistByCpf).toBeInstanceOf(Function);
    });
  });

  describe('Run the addCpfToBlacklist function', () => {
    const mocksDefault = {
      onSuccess: jest.fn(data => data),
      onError: jest.fn(data => data),
    };

    const mocks = {
      validMock: {
        ...mocksDefault,
        payload: { cpf: 'valid_cpf' },
      },
      cpfIntoDbMock: {
        ...mocksDefault,
        payload: { cpf: 'cpf_into_db' },
      },
      invalidCpfMock: {
        ...mocksDefault,
        payload: { cpf: 'invalid_cpf' },
      },
    };

    test('Should execute the onSuccess function', async () => {
      await blacklistWrapper(dependencies).addCpfToBlacklist(mocks.validMock);

      expect(mocks.validMock.onSuccess).toHaveBeenCalledTimes(1);
      expect(mocks.validMock.onError).toHaveBeenCalledTimes(0);
    });

    test('Should validate the addCpfToBlacklist contract', async () => {
      const response = await blacklistWrapper(dependencies).addCpfToBlacklist(mocks.validMock);

      expect(response.statusCode).toEqual(201);
      expect(response.data).toEqual({ message: 'CPF was added successfully' });
    });

    test('Should return invalid document number message', async () => {
      const response = await blacklistWrapper(dependencies).addCpfToBlacklist(mocks.invalidCpfMock);

      expect(response).toEqual({ status: 400, message: 'invalid document' });
    });

    test('Should return document is already registered message', async () => {
      const response = await blacklistWrapper(dependencies).addCpfToBlacklist(mocks.cpfIntoDbMock);

      expect(response).toEqual({ status: 405, message: 'document is already registered' });
    });

    test('Should execute the onError function', async () => {
      await blacklistWrapper(errorDependencies).addCpfToBlacklist(mocks.validMock);

      expect(mocks.validMock.onSuccess).toHaveBeenCalledTimes(0);
      expect(mocks.validMock.onError).toHaveBeenCalledTimes(1);
    });

    test('Should treat some error', async () => {
      const error = await blacklistWrapper(errorDependencies).addCpfToBlacklist(mocks.validMock);

      expect(error).toEqual('Error test');
    });
  });

  describe('Run the getBlacklistByCpf function', () => {
    const mocksDefault = {
      onSuccess: jest.fn(data => data),
      onError: jest.fn(data => data),
    };

    const mocks = {
      freeMock: {
        ...mocksDefault,
        query: { cpf: 'free_cpf' },
      },
      blockMock: {
        ...mocksDefault,
        query: { cpf: 'block_cpf' },
      },
    };

    test('Should execute the onSuccess function', async () => {
      await blacklistWrapper(dependencies).getBlacklistByCpf(mocks.freeMock);

      expect(mocks.freeMock.onSuccess).toHaveBeenCalledTimes(1);
      expect(mocks.freeMock.onError).toHaveBeenCalledTimes(0);
    });

    test('Should return FREE message when cpf is not registered', async () => {
      const response = await blacklistWrapper(dependencies).getBlacklistByCpf(mocks.freeMock);

      expect(response.data).toEqual({ status: 'FREE' });
    });

    test('Should return BLOCK message when cpf is registered', async () => {
      const response = await blacklistWrapper(dependencies).getBlacklistByCpf(mocks.blockMock);

      expect(response.data).toEqual({ status: 'BLOCK' });
    });

    test('Should execute the onError function', async () => {
      await blacklistWrapper(errorDependencies).getBlacklistByCpf(mocks.freeMock);

      expect(mocks.freeMock.onSuccess).toHaveBeenCalledTimes(0);
      expect(mocks.freeMock.onError).toHaveBeenCalledTimes(1);
    });

    test('Should treat some error', async () => {
      const error = await blacklistWrapper(errorDependencies).getBlacklistByCpf(mocks.freeMock);

      expect(error).toEqual('Error test');
    });
  });

  describe('Run the removeBlacklistByCpf function', () => {
    const mocks = {
      query: { cpf: 'cpf' },
      onSuccess: jest.fn(data => data),
      onError: jest.fn(data => data),
    };

    test('Should execute the onSuccess function', async () => {
      await blacklistWrapper(dependencies).removeBlacklistByCpf(mocks);

      expect(mocks.onSuccess).toHaveBeenCalledTimes(1);
      expect(mocks.onError).toHaveBeenCalledTimes(0);
    });

    test('Should validate the removeBlacklistByCpf contract', async () => {
      const response = await blacklistWrapper(dependencies).removeBlacklistByCpf(mocks);

      expect(response.data).toEqual({ message: 'CPF was removed successfully' });
    });

    test('Should execute the onError function', async () => {
      await blacklistWrapper(errorDependencies).removeBlacklistByCpf(mocks);

      expect(mocks.onSuccess).toHaveBeenCalledTimes(0);
      expect(mocks.onError).toHaveBeenCalledTimes(1);
    });

    test('Should treat some error', async () => {
      const error = await blacklistWrapper(errorDependencies).removeBlacklistByCpf(mocks);

      expect(error).toEqual('Error test');
    });
  });
});
