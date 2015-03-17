var createStore = require('./lib/create_store');
var createCollectionStore = require('./lib/create_collection_store');
var localSync = require('./lib/local_sync');
module.exports = {
  createStore: createStore,
  createCollectionStore: createCollectionStore,
  localSync: localSync
}
