const Joi = require('joi');

const { getOnlyNumber } = require('../../commons/getOnlyNumber');

exports.addCpfToBlacklist = {
  body: Joi.object({
    cpf: Joi.string().required().custom(getOnlyNumber, 'transform documento number to only number').error(new Error('document number is required')),
  }).required(),
};

exports.blacklistByCpf = {
  params: Joi.object({
    cpf: Joi.string().required().custom(getOnlyNumber, 'transform documento number to only number').error(new Error('document number is required')),
  }).required(),
};
