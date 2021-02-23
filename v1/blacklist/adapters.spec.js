const adapterWrapper = require('./adapters');

describe('Blacklist Adapter Unit tests', () => {
  const responseHandlers = {
    onSuccess: jest.fn(),
    onError: jest.fn(),
  };

  const useCase = {
    addCpfToBlacklist: jest.fn(),
    getBlacklistByCpf: jest.fn(),
    removeBlacklistByCpf: jest.fn(),
  };

  const setRequestEnding = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  describe('Smoking Tests', () => {
    test('Should return the dependencies functions', () => {
      const {
        addCpfToBlacklist,
        getBlacklistByCpf,
        removeBlacklistByCpf,
      } = adapterWrapper(responseHandlers, useCase, setRequestEnding);

      expect(addCpfToBlacklist).toBeInstanceOf(Function);
      expect(getBlacklistByCpf).toBeInstanceOf(Function);
      expect(removeBlacklistByCpf).toBeInstanceOf(Function);
    });
  });

  describe('Run the addCpfToBlacklist function', () => {
    const mocks = {
      request: {},
      response: {},
    };

    test('Should execute the useCase.addCpfToBlacklist function', () => {
      adapterWrapper(responseHandlers, useCase, setRequestEnding).addCpfToBlacklist(mocks);

      expect(responseHandlers.onSuccess).toHaveBeenCalledTimes(1);
      expect(responseHandlers.onError).toHaveBeenCalledTimes(1);
    });
  });

  describe('Run the getBlacklistByCpf function', () => {
    const mocks = {
      request: {},
      response: {},
    };

    test('Should execute the useCase.getBlacklistByCpf function', () => {
      adapterWrapper(responseHandlers, useCase, setRequestEnding).getBlacklistByCpf(mocks);

      expect(responseHandlers.onSuccess).toHaveBeenCalledTimes(1);
      expect(responseHandlers.onError).toHaveBeenCalledTimes(1);
    });
  });

  describe('Run the removeBlacklistByCpf function', () => {
    const mocks = {
      request: {},
      response: {},
    };

    test('Should execute the useCase.removeBlacklistByCpf function', () => {
      adapterWrapper(responseHandlers, useCase, setRequestEnding).removeBlacklistByCpf(mocks);

      expect(responseHandlers.onSuccess).toHaveBeenCalledTimes(1);
      expect(responseHandlers.onError).toHaveBeenCalledTimes(1);
    });
  });
});
