var createStore = require('./create_store');
var findIndex = require('./utils/find_index');
var mergeObject = require('./utils/merge_object');
var findById = require('./utils/find_by_id');

module.exports = function(collectionKey, syncLocally) {

  var buildInitialState = function() {
    var initialState = {};
    initialState[collectionKey] = [];
    return initialState;
  }

  var collectionStore = createStore(buildInitialState());


  collectionStore.findById = function(id, allowNonIntIds) {
    var found;
    if (!allowNonIntIds) {
      id = parseInt(id, 10);
    }
    return findById(collectionStore.getState()[collectionKey], id)
  }

  collectionStore.findIndex = function(obj, allowNonIntIds) {
    if (obj && obj.id) {
      id = obj.id;
    } else {
      id = obj;
    }
    if (!allowNonIntIds) {
      id = parseInt(id, 10);
    }
    return findIndex(collectionStore.getState()[collectionKey], id);
  }

  collectionStore.mergeObject = function(item) {
    mergeObject(collectionStore, collectionKey, item);
  }

  // save resetState, and pass in new state for collection
  var ogResetState = collectionStore.resetState;
  collectionStore.resetState = function(newState){
    var state = newState || buildInitialState();
    ogResetState.call(collectionStore, state);
  }

  if (syncLocally) {
    var localSync = require('./local_sync');
    localSync(collectionKey, collectionStore);
  }

  return collectionStore;
};
