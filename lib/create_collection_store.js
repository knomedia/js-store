var createStore = require('./create_store');

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
    // TODO: consider actual for loop so you can `break` when you find it
    collectionStore.getState()[collectionKey].forEach(function(element){
      if (element.id === id) {
        found = element;
      }
    });
    return found;
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
