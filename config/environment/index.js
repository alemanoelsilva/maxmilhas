require('dotenv').config();

const ENVIRONMENT = {
  TEST: 'test',
  DEV: 'development',
  DEVELOPMENT: 'development',
};

const env = process.env.NODE_ENV || ENVIRONMENT.DEV;
const name = ENVIRONMENT[env.toUpperCase()];

module.exports = require(`./${name}.js`);
