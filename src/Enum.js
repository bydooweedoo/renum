'use strict';

const R = require('ramda');

const EnumFromObject = Object.freeze;

const EnumFromArray = R.reduce((acc, value) => EnumValue(value)(acc), {});

const EnumFromPairs = R.reduce((acc, pair) => EnumPairValue(pair)(acc), {});

const EnumKeyValue = (key, value) => R.assoc(
    R.ifElse(
        R.is(String),
        R.identity,
        String
    )(key), value
);

const EnumValue = value => EnumKeyValue(value, value);

const EnumPairValue = pair => EnumKeyValue(pair[0], pair[1]);

const excludeEmpty = R.filter(R.pipe(R.length, R.gte(R.__, 1)));

const debug = R.tap(console.log);

const isSingleArg = R.pipe(R.length, R.equals(1));

/**
 * @alias module:enum
 * @example
 * From `ES6` string:
 * ```js
import Enum from 'enum';

export default Enum('FIRST SECOND');
```
* Which equals to:
```js
import Enum from 'enum';

export default Enum(`
    FIRST
    SECOND
`);
 * ```
 * @param {Object|Array|Map|Set|...String} values Input arguments.
 * @return {Object} Frozen object corresponding to given arguments.
 */

const EnumSingle = R.cond([
    [R.is(Array), R.pipe(EnumFromArray)],
    [R.is(Map), R.pipe(Array.from, EnumFromPairs)],
    [R.is(Set), R.pipe(Array.from, EnumFromArray)],
    [R.is(String), R.pipe(R.split(/[\s]+/ig), excludeEmpty, EnumFromArray)],
    [R.T, R.identity],
]);

const EnumMultiple = R.cond([
    [R.pipe(R.head, R.is(String)), EnumFromArray],
    [R.T, R.identity],
]);

const Enum = R.unapply(R.ifElse(
    isSingleArg,
    R.pipe(R.head, EnumSingle, EnumFromObject),
    R.pipe(EnumMultiple, EnumFromObject)
));

exports = module.exports = Enum;
