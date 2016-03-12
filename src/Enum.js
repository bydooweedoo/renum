'use strict';

import R from 'ramda';
import _extend from './Extend';
import { excludeEmpty } from './Utils';
import { arePairs, isSingleArg } from './Valid';
import { reduceWith, fromSingle, fromPair } from './Item';

const debug = R.tap(console.log);

const EnumFromObject = Object.freeze;

const EnumFromArray = reduceWith(fromSingle);

const EnumFromPairs = reduceWith(fromPair);

const ApplyToObject = R.apply(R.__, R.of({}));

const extend = _extend([[R.T, R.identity]]);

const getCustomConditions = arg => R.cond(extend.getConditions())(arg);

const EnumSingle = R.pipe(
    R.pipe(getCustomConditions),
    R.cond([
        [R.isNil, R.always({})],
        [arePairs, EnumFromPairs],
        [R.is(Array), EnumFromArray],
        [R.is(Map), R.pipe(Array.from, EnumFromPairs)],
        [R.is(Set), R.pipe(Array.from, EnumFromArray)],
        [R.is(String), R.pipe(
            R.split(/[\s]+/ig),
            excludeEmpty,
            EnumFromArray
        )],
        [R.either(
            R.is(Number),
            R.is(Boolean)
        ), R.pipe(fromSingle, ApplyToObject)],
        [R.is(Symbol), R.pipe(
            R.invoker(0, 'toString'),
            fromSingle,
            ApplyToObject
        )],
        [R.T, R.identity],
    ])
);

/**
 * @param {...Object|...Array|...Map|
 *        ...Set|...String|...Number|
 *        ...Symbol|...Boolean} values Input arguments.
 * @return {Object} Frozen object corresponding to given arguments.
 */
const Enum = R.unapply(R.ifElse(
    isSingleArg,
    R.pipe(R.head, EnumSingle, EnumFromObject),
    R.pipe(R.reduce(R.converge(R.merge, [
        R.pipe(R.nthArg(1), EnumSingle),
        R.nthArg(0),
    ]), {}), EnumFromObject)
));

Enum.extend = extend;

export default Enum;
