var createCollection = require('../../lib/create_collection_store')
assert = require('assert')
ok = assert.ok
equal = assert.equal;

describe('create_collection_store', function(){

  it('returns a store object', function(){
    var st = createCollection('teams');
    assert(st);
  })

  it('has a collection key that holds an array', function(){
    var st = createCollection('teams');
    assert(st.getState().teams.push);
  })

  describe('findById', function(){
    var els;
    var store = createCollection('teams');

    beforeEach(function(){
      els = [
        {id: 1, value: 'foo'},
        {id: 2, value: 'bar'},
        {id: 3, value: 'baz'}
      ]
      store.setState({teams: els});
    });

    it('finds an element by id', function(){
      var found = store.findById(2);
      assert.equal(found.value, 'bar');
    })

    it('converts id param to an integer', function(){
      var found = store.findById('3');
      assert.equal(found.value, 'baz');
    })

    it('allows non int ids and wont convert them to ints', function(){
      store.setState({teams: [
        {id: 'best', value: 'foo'},
        {id: 'worst', value: 'bar'},
        {id: 'noshow', value: 'baz'}
      ]})
      var found = store.findById('worst', true);
      assert.equal(found.value, 'bar');
    })
  })

  describe('findIndex', function(){
    var els;
    var store = createCollection('teams');

    beforeEach(function(){
      els = [
        {id: 1, value: 'foo'},
        {id: 2, value: 'bar'},
        {id: 3, value: 'baz'}
      ]
      store.setState({teams: els});
    });

    it('returns an appropriate index', function(){
      assert.equal(store.findIndex(2), 1);
    })

    it('looks for id prop if object passed', function(){
      assert.equal(store.findIndex({id: 3}), 2);
    })

    it('converts ids to ints by default', function(){
      assert.equal(store.findIndex({id: '1'}), 0);
      assert.equal(store.findIndex('1'), 0);
    })
  })

  describe('add', function() {
    var els;
    var store = createCollection('teams');

    beforeEach(function() {
      els = [
        {id: 1, value: 'foo'},
        {id: 2, value: 'bar'},
        {id: 3, value: 'baz'}
      ]
      store.setState({teams: els});
    })

    it('adds a new object to the collection', function() {
      var newObj = {id: 19, value: 'wat'}
      store.add(newObj)
      assert.deepEqual(store.findById(19), newObj)
      assert.equal(store.getState().teams.length, 4)
    });
  })

  describe('upsert', function() {
    var els;
    var store = createCollection('teams');

    beforeEach(function() {
      els = [
        {id: 1, value: 'foo'},
        {id: 2, value: 'bar'},
        {id: 3, value: 'baz'}
      ]
      store.setState({teams: els});
    })

    it('replaces existing object by id', function() {
      var newObj = {id: 2, value: 'wat'}
      store.upsert(newObj)
      assert.deepEqual(store.findById(2), newObj)
      assert.equal(store.getState().teams.length, 3)
      assert.deepEqual(store.getState().teams[1], newObj)
    });

    it('adds new object when object id not found in collection', function() {
      var newObj = {id: 19, value: 'wat'}
      store.upsert(newObj)
      assert.deepEqual(store.findById(19), newObj)
      assert.equal(store.getState().teams.length, 4)
    });
  });

  describe('replace', function() {
    var els;
    var store = createCollection('teams');

    beforeEach(function() {
      els = [
        {id: 1, value: 'foo'},
        {id: 2, value: 'bar'},
        {id: 3, value: 'baz'}
      ]
      store.setState({teams: els});
    })

    it('replaces existing object by id', function() {
      var newObj = {id: 2, value: 'wat'}
      store.replace(newObj)
      assert.deepEqual(store.findById(2), newObj)
      assert.equal(store.getState().teams.length, 3)
      assert.deepEqual(store.getState().teams[1], newObj)
    });

    it('returns undefined when object id not found', function() {
      var newObj = {id: 22, value: 'wat'}
      assert.equal(store.replace(newObj), undefined)
      assert.deepEqual(store.findById(22), undefined)
      assert.equal(store.getState().teams.length, 3)
    });
  })

  describe('destroy', function() {
    var els;
    var store = createCollection('teams');

    beforeEach(function() {
      els = [
        {id: 1, value: 'foo'},
        {id: 2, value: 'bar'},
        {id: 3, value: 'baz'}
      ]
      store.setState({teams: els});
    })

    it('removes existing object by id', function() {
      var newObj = {id: 2, value: 'wat'}
      store.destroy(newObj.id)
      assert.deepEqual(store.findById(2), undefined)
      assert.equal(store.getState().teams.length, 2)
    });

    it('returns undefined when object id not found', function() {
      var newObj = {id: 22, value: 'wat'}
      assert.equal(store.destroy(newObj.id), undefined)
      assert.deepEqual(store.findById(22), undefined)
    });
  })

  describe('mergeObject', function(){
    var els;
    var store = createCollection('teams');

    beforeEach(function(){
      els = [
        {id: 1, value: 'foo'},
        {id: 2, value: 'bar'},
        {id: 3, value: 'baz'}
      ]
      store.setState({teams: els});
    });

    it('updates objects when collection has an existing object with same id', function(){
      var newObj = {id: 2, value: 'new'};
      store.mergeObject(newObj);
      assert.deepEqual(store.findById(2), newObj);
    })

    it('adds objects when collection does not have existing object with same id', function(){
      var newObj = {id: 6, value: 'new'};
      store.mergeObject(newObj);
      var collection = store.getState().teams;
      assert.equal(collection.length, 4);
      assert.deepEqual(store.findById(6), newObj);
    })

    it('allows non int ids', function(){
      els = [
        {id: 'a', value: 'foo'},
        {id: 'b', value: 'bar'},
        {id: 'c', value: 'baz'}
      ]
      store.setState({teams: els});
      var newObj = {id: 'd', value: 'another'};
      store.mergeObject(newObj);
      assert.deepEqual(store.findById('d', true), newObj);
    })
  })

});
