'use strict';

const R = require('ramda');
const Utils = require('./Utils');
const Valid = require('./Valid');
const Item = require('./Item');
const Extend = require('./Extend');
const debug = R.tap(console.log);

const EnumFromObject = Object.freeze;

const EnumFromArray = Item.reduceWith(Item.Value);

const EnumFromPairs = Item.reduceWith(Item.Pair);

const ApplyToObject = R.apply(R.__, R.of({}));

const EnumSingle = R.pipe(
    R.cond(Extend.conditions),
    R.cond([
        [R.isNil, R.always({})],
        [Valid.arePairs, EnumFromPairs],
        [R.is(Array), EnumFromArray],
        [R.is(Map), R.pipe(Array.from, EnumFromPairs)],
        [R.is(Set), R.pipe(Array.from, EnumFromArray)],
        [R.is(String), R.pipe(
            R.split(/[\s]+/ig),
            Utils.excludeEmpty,
            EnumFromArray
        )],
        [R.either(
            R.is(Number),
            R.is(Boolean)
        ), R.pipe(Item.Value, ApplyToObject)],
        [R.is(Symbol), R.pipe(
            R.invoker(0, 'toString'),
            Item.Value,
            ApplyToObject
        )],
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
    R.pipe(R.reduce(R.converge(R.merge, [
        R.pipe(R.nthArg(1), EnumSingle),
        R.nthArg(0)
    ]), {}), EnumFromObject)
));

Enum.extend = Extend;

module.exports = Enum;
