'use strict';

const R = require('ramda');
const Valid = require('./Valid');
const Item = require('./Item');
const Extend = require('./Extend');
const debug = R.tap(console.log);

const EnumFromObject = Object.freeze;
const EnumFromArray = R.reduce((acc, value) => Item.Value(value)(acc), {});
const EnumFromPairs = R.reduce((acc, pair) => Item.Pair(pair)(acc), {});

const excludeEmpty = R.filter(R.pipe(R.length, R.gte(R.__, 1)));

const EnumSingle = R.pipe(
    R.cond(Extend.conditions),
    R.cond([
        [R.isNil, R.always({})],
        [Valid.arePairs, EnumFromPairs],
        [R.is(Array), EnumFromArray],
        [R.is(Map), R.pipe(Array.from, EnumFromPairs)],
        [R.is(Set), R.pipe(Array.from, EnumFromArray)],
        [R.is(String), R.pipe(
            R.split(/[\s]+/ig), excludeEmpty, EnumFromArray
        )],
        [R.either(
            R.is(Number),
            R.is(Boolean)
        ), R.pipe(Item.Value, R.apply(R.__, [{}]))],
        [R.T, R.identity],
    ])
);

/**
 * @param {Object|Array|Map|Set|...String} values Input arguments.
 * @return {Object} Frozen object corresponding to given arguments.
 */
const Enum = R.unapply(R.ifElse(
    Valid.isSingleArg,
    R.pipe(R.head, EnumSingle, EnumFromObject),
    R.pipe(R.reduce((acc, value) => R.merge(acc, EnumSingle(value)), {}), EnumFromObject)
));

Enum.extend = Extend;

exports = module.exports = Enum;
