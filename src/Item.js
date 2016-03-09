'use strict';

const R = require('ramda');

const KeyValue = (key, value) => R.assoc(
    R.ifElse(
        R.is(String),
        R.identity,
        String
    )(key), value
);

const Value = value => KeyValue(value, value);

const Pair = pair => KeyValue(pair[0], pair[1]);

const boundWith = f => R.converge(R.call, [
    R.pipe(R.nthArg(1), f),
    R.nthArg(0),
]);

const reduceWith = R.pipe(boundWith, R.flip(R.reduce)({}));

module.exports = {
    KeyValue,
    Value,
    Pair,
    reduceWith,
    boundWith,
};
