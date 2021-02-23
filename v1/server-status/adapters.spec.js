const adapterWrapper = require('./adapters');

describe('Server-Status Adapter Unit tests', () => {
  const responseHandlers = {
    onSuccess: jest.fn(),
    onError: jest.fn(),
  };

  const useCase = {
    getServerStatus: jest.fn(),
  };

  beforeEach(() => jest.clearAllMocks());

  describe('Smoking Tests', () => {
    test('Should return the dependencies functions', () => {
      const { getServerStatus } = adapterWrapper(responseHandlers, useCase);

      expect(getServerStatus).toBeInstanceOf(Function);
    });
  });

  describe('Run the getServerStatus function', () => {
    const mocks = {
      request: {},
      response: {},
    };

    test('Should execute the useCase.getServerStatus function', () => {
      adapterWrapper(responseHandlers, useCase).getServerStatus(mocks);

      expect(responseHandlers.onSuccess).toHaveBeenCalledTimes(1);
      expect(responseHandlers.onError).toHaveBeenCalledTimes(1);
    });
  });
});
