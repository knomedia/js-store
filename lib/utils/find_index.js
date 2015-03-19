module.exports = function findIndex(collection, id) {
  var i = 0;
  var index = -1;
  for(i=0; i<collection.length; i++) {
    if(collection[i].id === id) {
      index = i;
      break;
    }
  }
  return index;
}
