# renum

`renum` is a small library to create frozen objects in javascript from multiple sources.

## Installation

Using [npm](https://www.npmjs.org/):

  $ npm install renum

Then

```js
import renum from 'renum';

export default renum(
  'INCREMENT',
  'DECREMENT'
);
```

## Extend

In order to let you use `renum` with other libraries, you can implement your own translator.

For example with `immutable`:

```js
// renum-immutable
import R from 'ramda';
import Immutable from 'immutable';

module.exports = [
  [Immutable.List.isList, R.invoker(0, 'toArray')],
  [Immutable.Map.isMap, R.invoker(0, 'toObject')],
  [Immutable.Stack.isStack, R.invoker(0, 'toJS')],
];
```

And then:

```js
import renum from 'renum';

renum.extend(require('renum-immutable'));
```

## Motivations

Firstly designed to create `action types` from `redux` based projects and easily be able to merge each other.

Then also to learn Functional Programming.
