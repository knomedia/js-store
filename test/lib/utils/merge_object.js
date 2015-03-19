var mergeObject = require('../../../lib/utils/merge_object');
var TestStore = require('../../../lib/create_collection_store')('tests');
var assert = require('assert');

describe('merge_object', function(){

  var collection = [];
  beforeEach(function(){
    collection = [
      {id: 2, value: 'bar'},
      {id: 3, value: 'baz'},
      {id: 1, value: 'foo'},
      {id: 4, value: 'qux'}
    ]
    TestStore.setState({tests: collection});
  });

  it('replaces the item when id exists in collection', function(){
    mergeObject(TestStore, 'tests', {id: 3, value: 'updated'});
    assert.equal(TestStore.getState().tests[1].value, 'updated');
  })

  it('adds item when id does not exist in collection', function(){
    mergeObject(TestStore, 'tests', {id: 10, value: 'updated'});
    var contents = TestStore.getState().tests;
    var lastItem = contents[contents.length - 1];
    assert.equal(lastItem.value, 'updated')
    assert.equal(contents.length, 5);
  })

});
