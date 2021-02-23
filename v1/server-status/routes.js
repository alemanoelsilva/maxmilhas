const serverStatus = require('./index');

module.exports = (app) => {
  app.get('/v1/server-status', serverStatus.getServerStatus);
};
