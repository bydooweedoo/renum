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
const isPair = R.both(
    R.is(Array),
    R.pipe(R.length, R.equals(2))
);
const arePairs = R.both(R.is(Array), R.pipe(R.head, isPair));
const extend = [[R.T, R.identity]];
const EnumSingle = R.pipe(R.cond(extend), R.cond([
    [arePairs, EnumFromPairs],
    [R.is(Array), EnumFromArray],
    [R.is(Map), R.pipe(Array.from, EnumFromPairs)],
    [R.is(Set), R.pipe(Array.from, EnumFromArray)],
    [R.is(String), R.pipe(R.split(/[\s]+/ig), excludeEmpty, EnumFromArray)],
    [R.is(Number), R.pipe(EnumValue, R.apply(R.__, [{}]))],
    [R.is(Boolean), R.pipe(EnumValue, R.apply(R.__, [{}]))],
    [R.T, R.identity],
]));

const EnumMultiple = R.cond([
    [R.pipe(R.head, R.is(String)), EnumFromArray],
    [R.T, R.identity],
]);

/**
 * @param {Object|Array|Map|Set|...String} values Input arguments.
 * @return {Object} Frozen object corresponding to given arguments.
 */
const Enum = R.unapply(R.ifElse(
    isSingleArg,
    R.pipe(R.head, EnumSingle, EnumFromObject),
    R.pipe(R.reduce((acc, value) => R.merge(acc, EnumSingle(value)), {}), EnumFromObject)
));

const isValidCondition = R.both(R.is(Function), R.pipe(R.prop('length'), R.equals(1)));
const isValidOperator = R.both(R.is(Function), R.pipe(R.prop('length'), R.gte(R.__, 0)));
const addExtend = R.invoker(3, 'splice')(0, 0, R.__, extend);

Enum.extend = R.unapply(R.ifElse(
    R.both(
        R.pipe(R.length, R.equals(2)),
        R.both(
            R.pipe(R.head, isValidCondition),
            R.pipe(R.last, isValidOperator)
        )
    ),
    addExtend,
    R.F
));

exports = module.exports = Enum;
