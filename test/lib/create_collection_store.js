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

    it('finds converts id param to an integer', function(){
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

});
