'use strict';

import R from 'ramda';
import { duplicate, stringify } from './Utils';

/**
 * Returns associated function for given key, value in separate arguments.
 *
 *    Item.fromKeyValue(1, 'ONE')({}) //=> {1: 'ONE'}
 *
 */
export const fromKeyValue = R.converge(R.assoc, [
    R.pipe(R.nthArg(0), stringify),
    R.nthArg(1),
]);

/**
 * Returns associated function for given key, value pair in single argument.
 *
 *    Item.fromPair([1, 'ONE'])({}) //=> {1: 'ONE'}
 *
 */
export const fromPair = R.apply(fromKeyValue);

/**
 * Returns associated function for given single argument.
 *
 *    Item.fromSingle(1)({}) //=> {1: 1}
 *
 */
export const fromSingle = R.pipe(duplicate, fromPair);

const boundWith = func => R.converge(R.call, [
    R.pipe(R.nthArg(1), func),
    R.nthArg(0),
]);

/**
 * Create a function to reduce list item with given from function.
 *
 *    const reduceFromPair = Item.reduceWith(Item.fromPair);
 *    reduceFromPair([[1, 'ONE'], [2, 'TWO']]) //=> {1: 'ONE', 2: 'TWO'}
 *
 */
export const reduceWith = R.pipe(boundWith, R.flip(R.reduce)({}));
