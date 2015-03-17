var localStore = require('store');

var serializeStore = function(key, store) {
  localStore.set(key, store.getState());
}

var setStateFromLocal = function(key, store) {
  store.setState(localStore.get(key));
}

module.exports = function(key, store) {
  setStateFromLocal(key, store);
  store.addChangeListener(serializeStore.bind(this, key, store));
  return store;
}
