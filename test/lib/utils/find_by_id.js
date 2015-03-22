var findById = require('../../../lib/utils/find_by_id');
var assert = require('assert');

describe('find_by_index', function(){
  var collection = [];
  beforeEach(function(){
    collection = [
      {id: 1, value: 'foo'},
      {id: 3, value: 'bar'},
      {id: 5, value: 'baz'},
    ]
  });

  it('finds object by id', function(){
    assert.deepEqual(findById(collection, 3), {id: 3, value: 'bar'});
  })

  it('returns undefined when no id found', function(){
    assert.equal(findById(collection, 9), undefined);
  })
})
