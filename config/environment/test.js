module.exports = {
  env: process.env.NODE_ENV,
  app: {
    port: process.env.PORT,
  },
  logger: {
    level: 'fatal',
    backupFileLog: process.env.BACKUP_FILE_LOG,
  },
  mongoDB: {
    databaseUri: process.env.MONGO_DATABASE_URI_TEST,
    databaseName: process.env.MONGO_DATABASE_NAME_TEST,
    collections: {
      cpf: process.env.CPF_COLLECTION,
    },
  },
  filePath: process.env.FILE_PATH,
};
