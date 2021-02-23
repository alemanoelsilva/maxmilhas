const { promisify } = require('util');
const fs = require('fs');
const path = require('path');

const logger = require('../config/logger');
const { consts: { BREAK_LINE } } = require('./consts');
const { getOnlyNumber } = require('./getOnlyNumber');

const writeFile = promisify(fs.appendFile);
const readFile = promisify(fs.readFile);
const unlinkFile = promisify(fs.unlink);

const removeNonNumericValue = ({ path: filePath, duration, method }) => {
  const arrPath = filePath.split('/');

  const basePath = arrPath.slice(0, 3).join('/');
  const document = arrPath.pop();

  return {
    duration,
    path: `${method} - ${basePath}/${getOnlyNumber(document)}`,
  };
};

const jsonToString = json => `${JSON.stringify(json)}${BREAK_LINE}`;

const mapToJson = string => JSON.parse(string);

const mapResponse = (acc, { path: filePath }) => {
  if (acc[filePath]) {
    return { ...acc, [`${filePath}`]: acc[filePath] + 1 };
  }

  return { ...acc, [`${filePath}`]: 1 };
};

const requestsManagerWrapper = (filePath) => {
  const initializeFile = async () => {
    try {
      await unlinkFile(filePath);
    } catch (err) {
      if (err.code !== 'ENOENT') {
        logger.fatal({ err }, 'Unlinking file error');
        process.exit(1);
      }
    }
  };

  const insertRequestsData = async (document) => {
    try {
      await writeFile(filePath, jsonToString(removeNonNumericValue(document)));
    } catch (err) {
      logger.error({ err }, 'Writing file error');
    }
  };

  const retreiveRequestsData = async () => {
    try {
      const basePath = path.join(path.resolve(), filePath);

      const response = await readFile(basePath);

      return response
        .toString()
        .split(BREAK_LINE)
        .filter(Boolean)
        .map(mapToJson)
        .reduce(mapResponse, {});
    } catch (err) {
      if (err.code === 'ENOENT') {
        const status = 'There is no data registered';
        logger.info(status);
        return status;
      }

      return logger.error({ err }, 'Reading file error');
    }
  };

  return {
    initializeFile,
    insertRequestsData,
    retreiveRequestsData,
  };
};

module.exports = requestsManagerWrapper;
