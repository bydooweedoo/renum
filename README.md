# renum

`renum` is a small library to create frozen objects in javascript from multiple sources.

## Getting started

Install `renum` using [npm](https://www.npmjs.org/):

```shell
npm install renum --save
```

Then using ES6

```js
import renum from 'renum';

export default renum(
  'INCREMENT',
  'DECREMENT'
);
```

Using ES5

```js
const renum = require('renum');

module.exports = renum(
  'INCREMENT',
  'DECREMENT'
);
```

## Usage

### From primitive arguments

#### Strings

```js
renum('1', '2', '3') //=> {1: '1', 2: '2', 3: '3'}
```

#### String
```js
renum('1 2 3') //=> {1: '1', 2: '2', 3: '3'}
```

#### Template String
```js
renum(`
  1
  2
  3
`) //=> {1: '1', 2: '2', 3: '3'}
```

#### Numbers
```js
renum(1, 2, 3) //=> {1: 1, 2: 2, 3: 3}
```

#### Boolean
```js
renum(true, false, true) //=> {true: true, false: false}
```

#### Empty values
```js
renum(null, undefined) //=> {}
```

#### Symbol
```js
renum(Symbol(1), Symbol(f => f + 1)) //=> {Symbol(1): Symbol(1), Symbol(f => f + 1): 'Symbol(f => f + 1)'}
```

### From Objects

#### Array

```js
renum(['1', 2, true]) //=> {1: '1', 2: 2, true: true}
```

#### Pairs

```js
renum([
  ['INCREMENT', n => n + 1],
  ['DECREMENT', n => n - 1],
]) //=> {INCREMENT: [Function], DECREMENT: [Function]}
```

#### Map

```js
renum(new Map({INCREMENT: '+', DECREMENT: '-'})) //=> {INCREMENT: '+', DECREMENT: '-'}
```

#### Set

```js
renum(new Set([1, 2, 3])) //=> {1: 1, 2: 2, 3: 3}
```

#### Inception

```js
renum(1, renum(2, renum(3))) //=> {1: 1, 2: 2, 3: 3}
```

## Extending renum

In order to let you use `renum` with other libraries, you can implement your own translator.

Example for [`immutable`](https://www.npmjs.com/package/immutable):

```js
// renum-immutable.js
import R from 'ramda';
import Immutable from 'immutable';

export default [
  [Immutable.List.isList, R.invoker(0, 'toArray')],
  [Immutable.Map.isMap, R.invoker(0, 'toObject')],
  [Immutable.Stack.isStack, R.invoker(0, 'toJS')],
];
```

And then:

```js
import R from 'ramda';
import renum from 'renum';
import renumImmutable from './renum-immutable';

// from a list of pairs
renum.extend(renumImmutable);

// or from arguments directly
renum.extend(R.isEmpty, R.always({}));
```

Extend functions are called in priority first pass, then a second pass will be done with the default included predicates/transforms.
It mean you actually can return another type rather than a `frozen Object`, and `renum` will convert it properly.

## Testing

```shell
npm test
```

## Motivations

 * Firstly designed to create immutable `action types` from [`redux`](https://www.npmjs.com/package/redux) based projects and easily be able to merge each other.
 * Learning Functional Programming.
