# js-store

> utilities for simple javascript stores

## install

```sh
npm install --save js-store
```

## usage

Simple Store
```javascript
var jsStore = require('js-store');

var myStore = jsStore.createStore({foo: 'bar'});
myStore.setState({baz: 'qux'});
myStore.getState(); // {foo: 'bar', baz: 'qux'});

var cb = function() {
  // pull data from store using getState
}

myStore.addChangeListener(cb);
myStore.setState({other: 'value'}); // cb will fire
myStore.removeChangeListener(cb);
myStore.setState({other: 'another value'}); // cb will not fire
```

Store Collections
```javascript
var jsStore = require('js-store');

var TeamsStore = jsStore.createCollectionStore('teams');

TeamsStore.getState(); // returns {teams: []}
TeamsStore.setState({teams: [
  {id: 1, name: 'a'},
  {id: 2, name: 'b'},
  {id: 3, name: 'c'}
]});

TeamsStore.findById(2); // returns {id: 2, name: 'b'}
```

Stores that sync with localStorage
```javascript
var jsStore = require('js-store');

var TeamsStore = jsStore.createCollectionStore('teams', true);
// changes to TeamsStore's state will now write to localStorage
// TeamStore's state will also start with state from localstorage
```

Syncing with local storage is also available for simple stores. To do so pass along a string key to the `createStore` method.
```javascript
var jsStore = require('js-store');

var myStore = jsStore.createStore({}, 'myStore');
```

To make singleton stores for your client side app, simply export a creaetd store from a module

```javascript
var jsStore = require('js-store');

var UserStore = jsStore.createStore({}, 'user');
module.exports = UserStore;
```
