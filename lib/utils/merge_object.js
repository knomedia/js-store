module.exports = function(Store, key, item) {
  var collection = Store.getState()[key];
  var index = Store.findIndex(item.id, true);
  if (index >= 0) {
    collection[index] = item;
  } else {
    collection.push(item);
  }
  var state = {};
  state[key] = collection
  Store.setState(state);
}
