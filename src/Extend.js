'use strict';

const R = require('ramda');
const Valid = require('./Valid');
const conditions = [[R.T, R.identity]];

const prependExtend = R.invoker(3, 'splice')(0, 0, R.__, conditions);
const ExtendSingle = R.ifElse(
    R.both(
        R.pipe(R.length, R.equals(2)),
        R.both(
            R.pipe(R.head, Valid.isCondition),
            R.pipe(R.last, Valid.isOperator)
        )
    ),
    prependExtend,
    R.F
);

const Extend = R.unapply(R.ifElse(
    R.both(
        Valid.isSingleArg,
        R.pipe(R.head, Valid.arePairs)
    ),
    R.pipe(R.head, R.map(ExtendSingle)),
    ExtendSingle
));

Extend.conditions = conditions;

module.exports = Extend;
