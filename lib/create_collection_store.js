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

  var getId = function getId(obj) {
    if (obj && obj.id) {
      id = obj.id;
    } else {
      id = obj;
    }
    return id
  }

  var getCollection = function getCollection() {
    return collectionStore.getState()[collectionKey]
  }

  var setCollection = function setCollection(collection) {
    let results = {}
    results[collectionKey] = collection
    return collectionStore.setState(results)
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
    let id = getId(obj)
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

  collectionStore.add = function(item) {
    let collection = getCollection()
    collection.push(item)
    return setCollection(collection)
  }

  collectionStore.replace = function(item) {
    let collection = getCollection()
    let idx = findIndex(collection, getId(item))
    if (idx >= 0) {
      collection[idx] = item
      setCollection(collection)
      return item
    } else {
      return undefined
    }
  }

  collectionStore.upsert = function(item) {
    let collection = getCollection()
    let idx = findIndex(collection, getId(item))
    if (idx >= 0) {
      collectionStore.replace(item)
    } else {
      collectionStore.add(item)
    }
  }

  collectionStore.destroy = function(id) {
    let collection = getCollection()
    let idx = findIndex(collection, getId(id))
    if (idx >= 0) {
      collection.splice(idx, 1)
      return id
    } else {
      return undefined
    }
  }

  if (syncLocally) {
    var localSync = require('./local_sync');
    localSync(collectionKey, collectionStore);
  }

  return collectionStore;
};
