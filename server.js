const logger = require('./config/logger');
const { app, mongoDB, filePath } = require('./config/environment');

const mongo = require('./config/mongo')(logger);
const { initializeFile } = require('./commons/requestManager')(filePath);

async function init() {
  await mongo.connect(mongoDB);
  await initializeFile();

  /*eslint-disable */
  const api = require('./app');

  await api.listen(app.port);

  return logger.info(`Application is running on port ${app.port}`);
}

init();