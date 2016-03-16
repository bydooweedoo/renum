'use strict';

import R from 'ramda';
import _extend from './Extend';
import { excludeEmpty } from './Utils';
import { arePairs, isSingleArg } from './Valid';
import { reduceWith, fromSingle, fromPair } from './Item';

const enumFromObject = R.ifElse(
    Object.isFrozen,
    R.identity,
    Object.freeze
);

const enumFromArray = reduceWith(fromSingle);

const enumFromPairs = reduceWith(fromPair);

const applyToObject = R.apply(R.__, R.of({}));

const extend = _extend([[R.T, R.identity]]);

const getCustomConditions = arg => R.cond(extend.getConditions())(arg);

const enumSingle = R.pipe(
    R.pipe(getCustomConditions),
    R.cond([
        [R.isNil, R.always({})],
        [arePairs, enumFromPairs],
        [R.is(Array), enumFromArray],
        [R.is(Map), R.pipe(Array.from, enumFromPairs)],
        [R.is(Set), R.pipe(Array.from, enumFromArray)],
        [R.is(String), R.pipe(
            R.split(/[\s]+/ig),
            excludeEmpty,
            enumFromArray
        )],
        [R.either(
            R.is(Number),
            R.is(Boolean)
        ), R.pipe(fromSingle, applyToObject)],
        [R.is(Symbol), R.pipe(
            R.invoker(0, 'toString'),
            fromSingle,
            applyToObject
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
    R.pipe(R.head, enumSingle, enumFromObject),
    R.pipe(R.reduceRight(R.converge(R.merge, [
        R.pipe(R.nthArg(1), enumSingle),
        R.nthArg(0),
    ]), {}), enumFromObject)
));

Enum.extend = extend;

export default Enum;
