var createStore = require('../../lib/create_store')
assert = require('assert')
ok = assert.ok
equal = assert.equal;

describe('create_store', function(){

  it('returns an object', function() {
    assert(createStore() !== undefined)
  });

  it('uses initial state', function() {
    var st = {foo: 'bar'};
    equal(createStore(st).getState(), st);
  });

  describe('setState', function(){
    it('should retain existing, non-merged state', function(){
      var st = createStore({foo: 'bar'});
      st.setState({baz: 'qux'});
      assert.deepEqual(st.getState(), {foo: 'bar', baz: 'qux'});
    });

    it('should overwrite existing state with new state', function(){
      var st = createStore({foo: 'bar'});
      st.setState({foo: 'qux'});
      assert.deepEqual(st.getState(), {foo: 'qux'});
    });
    it('should call an optional callback', function(){
      var st = createStore({foo: 'bar'});
      var called = 0;
      var cb = function(){
        called += 1;
      }
      st.setState({foo: 'qux'}, cb);
      assert.equal(called, 1);
    })
  });

  describe('addChangeListener', function(){
    it('calls the passed in listener when state changes', function(){
      var store = createStore();
      var count = 0
      var cb = function() {
        count = true;
      }
      store.addChangeListener(cb);
      store.setState({foo: 'bar'});
      equal(count, 1);
    })
  });

  describe('removeChangeListener', function(){
    it('should stop calling cb once removed', function(){
      var store = createStore();
      var count = 0
      var cb = function() {
        count = true;
      }
      store.addChangeListener(cb);
      store.removeChangeListener(cb);
      store.setState({foo: 'bar'});
      equal(count, 0);
    })
  })

});
