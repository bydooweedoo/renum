'use strict';

import R from 'ramda';
import extend from './Extend';
import { excludeEmpty } from './Utils';
import { arePairs, isSingleArg } from './Valid';
import { reduceWith, fromSingle, fromPair } from './Item';

const EnumFromObject = Object.freeze;

const EnumFromArray = reduceWith(fromSingle);

const EnumFromPairs = reduceWith(fromPair);

const ApplyToObject = R.apply(R.__, R.of({}));

const EnumSingle = conditions => R.pipe(
    R.cond(conditions),
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
        R.pipe(R.nthArg(1), R.pipe(extend.getConditions, EnumSingle)),
        R.nthArg(0),
    ]), {}), EnumFromObject)
));

Enum.extend = extend;

export default Enum;
