const { MongoClient } = require('mongodb');

const state = {};

module.exports = logger => ({
  connect: async ({ databaseUri, databaseName }) => {
    try {
      const client = await MongoClient.connect(databaseUri, {
        useUnifiedTopology: true,
      });

      state.db = client.db(databaseName);

      logger.info(`Connected to Mongo ${databaseName}`);

      return state.db;
    } catch (err) {
      logger.fatal({ err }, 'Connecting to MongoConnect');
      return process.exit(1);
    }
  },

  disconnect: () => state.db.close().then(() => { state.db = null; }),

  collection: (collectionName) => {
    if (state.db) {
      return state.db.collection(collectionName);
    }

    throw new Error('There is no connection to the database.');
  },

  getConnection: () => state.db,
});
