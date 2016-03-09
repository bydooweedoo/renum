'use strict';

const R = require('ramda');

const isSingleArg = R.pipe(R.length, R.equals(1));

const isPair = R.both(
    R.is(Array),
    R.pipe(R.length, R.equals(2))
);

const arePairs = R.both(R.is(Array), R.pipe(R.head, isPair));

const isCondition = R.both(
    R.is(Function),
    R.pipe(
        R.prop('length'),
        R.equals(1)
    )
);

const isOperator = R.both(
    R.is(Function),
    R.pipe(
        R.prop('length'),
        R.gte(R.__, 0)
    )
);

module.exports = {
    isSingleArg,
    isPair,
    arePairs,
    isCondition,
    isOperator,
};
