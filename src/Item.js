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

module.exports = {
    KeyValue,
    Value,
    Pair,
};
