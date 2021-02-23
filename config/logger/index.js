const moment = require('moment');
const path = require('path');
const bunyan = require('bunyan');
const RotatingFileStream = require('bunyan-rotating-file-stream');
const fs = require('fs');

const { env, logger: { level, backupFileLog } } = require('../environment');

const { name } = require('../../package.json');

const backupFileLogName = `${backupFileLog}/${name}-${moment().format().slice(0, 10)}.log`;

const dir = `.${backupFileLog}`;

try {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
} catch (error) {
  /*eslint-disable */
  console.log(error);
  process.exit(1);
}

module.exports = bunyan.createLogger({
  name,
  streams: [{
    stream: process.stdout,
    level,
  }, {
    stream: env !== 'test'
      ? new RotatingFileStream({
        path: path.join(path.resolve(), backupFileLogName),
        period: '7d',
        totalFiles: 10,
        rotateExisting: true,
        threshold: '10m',
        totalSize: '20m',
        gzip: false,
      })
      : process.stdout,
    level,
  }],
});
