var findIndex = require('./find_index');

module.exports = function findById(collection, id) {
  var index = findIndex(collection, id);
  return collection[index];
}
