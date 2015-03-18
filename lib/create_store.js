var EventEmitter = require('events').EventEmitter;
var assign = require('lodash.assign');

module.exports = createStore;

function createStore(initialState, localKey) {
  var dispatcher = new EventEmitter();
  var state = initialState || {};

  var store = {

    resetState: function(newState) {
      state = newState || {};
      this.emitChange();
    },

    setState: function(newState, cb) {
      state = assign(state, newState);
      this.emitChange();
      if (cb && cb.call) {
        cb.call();
      }
    },

    getState: function() {
      return state;
    },

    addChangeListener: function (listener) {
      dispatcher.on('change', listener);
    },

    removeChangeListener: function (listener) {
      dispatcher.removeListener('change', listener);
    },

    emitChange: function() {
      dispatcher.emit('change');
    }
  };

  if (localKey) {
    var localSync = require('./local_sync');
    localSync(localKey, store);
  }

  return store;
};
