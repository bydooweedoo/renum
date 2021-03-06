import R from 'ramda';
import _extend from './Extend';
import { excludeEmpty } from './Utils';
import { isPair, arePairs, isSingleArg } from './Valid';
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

// istanbul ignore next
const getTypeof = a => typeof(a);

// fix for node v0.10, v0.12
const isSymbol = R.pipe(getTypeof, R.equals('symbol'));

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
        [isSymbol, R.pipe(
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

const callWithEmptyObject = R.flip(R.call)({});

Enum.extend = extend;
Enum.fromPair = R.ifElse(
    isPair,
    R.pipe(fromPair, callWithEmptyObject, enumFromObject),
    R.identity
);
Enum.fromPairs = R.ifElse(
    arePairs,
    R.pipe(enumFromPairs, enumFromObject),
    R.identity
);
Enum.fromArray = R.ifElse(
    R.is(Array),
    R.pipe(enumFromArray, enumFromObject),
    R.identity
);
Enum.fromObject = R.ifElse(
    R.is(Object),
    enumFromObject,
    R.identity
);

export default Enum;
