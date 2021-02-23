const moment = require('moment');

const serverStatusWrapper = require('./use-cases');

describe('Server-Status Use Case Unit tests', () => {
  const dependencies = {
    repository: {
      find: jest.fn(() => Promise.resolve([1, 2])),
    },
    services: {
      retreiveRequestsData: jest.fn(() => Promise.resolve(({ teste: 1 }))),
    },
    logger: {
      info: jest.fn(),
    },
    moment,
  };

  const errorDependencies = {
    ...dependencies,
    repository: {
      find: jest.fn(() => Promise.reject('Error test')),
    },
  };

  beforeEach(() => jest.clearAllMocks());

  describe('Smoking Tests', () => {
    test('Should return the dependencies functions', () => {
      const { getServerStatus } = serverStatusWrapper(dependencies);

      expect(getServerStatus).toBeInstanceOf(Function);
    });
  });

  describe('Run the getServerStatus function', () => {
    const mocks = {
      onSuccess: jest.fn(data => data),
      onError: jest.fn(data => data),
    };

    test('Should execute the onSuccess function', async () => {
      await serverStatusWrapper(dependencies).getServerStatus(mocks);

      expect(mocks.onSuccess).toHaveBeenCalledTimes(1);
      expect(mocks.onError).toHaveBeenCalledTimes(0);
    });

    test('Should validate the getServerStatus contract', async () => {
      const response = await serverStatusWrapper(dependencies).getServerStatus(mocks);

      expect(response.data).toEqual({
        uptime: '00:00:01',
        cpfAmountInBlacklist: 2,
        status: { teste: 1 },
      });
    });

    test('Should execute the onError function', async () => {
      await serverStatusWrapper(errorDependencies).getServerStatus(mocks);

      expect(mocks.onSuccess).toHaveBeenCalledTimes(0);
      expect(mocks.onError).toHaveBeenCalledTimes(1);
    });

    test('Should treat some error', async () => {
      const error = await serverStatusWrapper(errorDependencies).getServerStatus(mocks);

      expect(error).toEqual('Error test');
    });
  });
});
