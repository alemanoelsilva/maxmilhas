const uuid = require('uuid/v4');
const moment = require('moment');

const logger = require('../../config/logger');

const { onSuccess } = require('../../commons/responseHandlers/onSuccess');
const { onError } = require('../../commons/responseHandlers/onError');

const adapters = require('./adapters');
const useCases = require('./use-cases');

const {
  mongoDB: { collections },
  filePath,
} = require('../../config/environment');

const { getConnection } = require('../../config/mongo')();

const { retreiveRequestsData } = require('../../commons/requestManager')(filePath);

const repository = require('../repository')({
  db: getConnection(),
  collectionName: collections.cpf,
  uuid,
});

const dependencies = {
  logger,
  repository,
  moment,
  services: {
    retreiveRequestsData,
  },
};

const responseHandlers = { onSuccess, onError };

const useCase = useCases(dependencies);

module.exports = adapters(responseHandlers, useCase);
