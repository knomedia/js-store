var createStore = require('./lib/create_store');
var createCollectionStore = require('./lib/create_collection_store');
var localSync = require('./lib/local_sync');
var findIndex = require('./lib/utils/find_index');
var findById = require('./lib/utils/find_by_id');

module.exports = {
  createStore: createStore,
  createCollectionStore: createCollectionStore,
  localSync: localSync,
  findIndex: findIndex,
  findById: findById
}
