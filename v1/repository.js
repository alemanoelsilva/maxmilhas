module.exports = ({ db, collectionName, uuid }) => ({
  save: data => db.collection(collectionName)
    .insertOne({ _id: uuid(), ...data })
    .then(result => result.ops[0]),

  find: (query = {}) => db.collection(collectionName)
    .find(query)
    .toArray(),

  findOne: (query = {}) => db.collection(collectionName)
    .findOne(query),

  remove: query => db.collection(collectionName).deleteOne(query),
});
