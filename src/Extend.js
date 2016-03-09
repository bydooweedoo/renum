'use strict';

const R = require('ramda');
const Valid = require('./Valid');
const store = [
    [R.T, R.identity],
];
const predicates = require('./Predicates')(new Map());
const conditions = require('./Conditions')(store);

const mergeConditions = R.cond([
    [predicates.hasPair, f => R.pipe(conditions.update(predicates.getPair(f), f))],
    [R.T, R.pipe(
        R.tap(R.pipe(R.head, predicates.setValue(conditions.getIndex()))),
        R.tap(conditions.append)
    )],
]);

const ExtendSingle = R.ifElse(
    R.both(
        R.pipe(R.length, R.equals(2)),
        R.both(
            R.pipe(R.head, Valid.isPredicate),
            R.pipe(R.last, Valid.isTransform)
        )
    ),
    mergeConditions,
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

Extend.conditions = store;

module.exports = Extend;
