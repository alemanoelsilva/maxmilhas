const uuid = require('uuid/v4');
const documentValidator = require('cpf-cnpj-validator');

const logger = require('../../config/logger');

const { onSuccess } = require('../../commons/responseHandlers/onSuccess');
const { onError } = require('../../commons/responseHandlers/onError');


const adapters = require('./adapters');
const useCases = require('./use-cases');
const services = require('./services')({
  logger,
  documentValidator,
});

const {
  mongoDB: { collections },
  filePath,
} = require('../../config/environment');

const { getConnection } = require('../../config/mongo')();
const { setRequestEnding } = require('../../commons/setRequestEnding');
const { insertRequestsData } = require('../../commons/requestManager')(filePath);

const repository = require('../repository')({
  db: getConnection(),
  collectionName: collections.cpf,
  uuid,
});

const dependencies = {
  logger,
  repository,
  services,
};

const responseHandlers = { onSuccess, onError };

const useCase = useCases(dependencies);

module.exports = adapters(responseHandlers, useCase, setRequestEnding(insertRequestsData));
