const { consts: { REQUEST_TYPES } } = require('../../commons/consts');

const schemas = require('./schemas');

const blacklist = require('./index');

const { requestValidation } = require('../../middlewares/schema-validation');

module.exports = (app) => {
  app.post('/v1/blacklist',
    requestValidation({
      schema: schemas.addCpfToBlacklist[REQUEST_TYPES.BODY],
      requestType: REQUEST_TYPES.BODY,
    }),
    blacklist.addCpfToBlacklist);

  app.get('/v1/blacklist/:cpf',
    requestValidation({
      schema: schemas.blacklistByCpf[REQUEST_TYPES.PARAMS],
      requestType: REQUEST_TYPES.PARAMS,
    }),
    blacklist.getBlacklistByCpf);

  app.delete('/v1/blacklist/:cpf',
    requestValidation({
      schema: schemas.blacklistByCpf[REQUEST_TYPES.PARAMS],
      requestType: REQUEST_TYPES.PARAMS,
    }),
    blacklist.removeBlacklistByCpf);
};
