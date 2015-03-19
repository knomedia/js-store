var findIndex = require('../../../lib/utils/find_index');
var assert = require('assert');

describe('find_index', function(){

  var collection = [];
  beforeEach(function(){
    collection = [
      {id: 2, value: 'bar'},
      {id: 3, value: 'baz'},
      {id: 1, value: 'foo'},
      {id: 4, value: 'qux'}
    ]
  });

  it('should return correct index int', function(){
    assert.equal(findIndex(collection, 4), 3);
  })

  it('returns -1 for unfound index', function(){
    assert.equal(findIndex(collection, 10), -1);
  })

});
