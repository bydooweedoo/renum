'use strict';

import R from 'ramda';
import Extend from './Extend';
import { excludeEmpty } from './Utils';
import { arePairs, isSingleArg } from './Valid';
import { reduceWith, Single, Pair } from './Item';

const debug = R.tap(console.log);

const EnumFromObject = Object.freeze;

const EnumFromArray = reduceWith(Single);

const EnumFromPairs = reduceWith(Pair);

const ApplyToObject = R.apply(R.__, R.of({}));

const EnumSingle = R.pipe(
    R.cond(Extend.conditions),
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
        ), R.pipe(Single, ApplyToObject)],
        [R.is(Symbol), R.pipe(
            R.invoker(0, 'toString'),
            Single,
            ApplyToObject
        )],
        [R.T, R.identity],
    ])
);

/**
 * @param {...Object|...Array|...Map|...Set|...String|...Number|...Symbol|...Boolean} values Input arguments.
 * @return {Object} Frozen object corresponding to given arguments.
 */
const Enum = R.unapply(R.ifElse(
    isSingleArg,
    R.pipe(R.head, EnumSingle, EnumFromObject),
    R.pipe(R.reduce(R.converge(R.merge, [
        R.pipe(R.nthArg(1), EnumSingle),
        R.nthArg(0)
    ]), {}), EnumFromObject)
));

Enum.extend = Extend;

export default Enum;
