'use strict';

import R from 'ramda';
import { duplicate, stringify } from './Utils';

export const fromKeyValue = R.converge(R.assoc, [
    R.pipe(R.nthArg(0), stringify),
    R.nthArg(1),
]);

export const fromPair = R.apply(fromKeyValue);

export const fromSingle = R.pipe(duplicate, fromPair);

export const boundWith = func => R.converge(R.call, [
    R.pipe(R.nthArg(1), func),
    R.nthArg(0),
]);

export const reduceWith = R.pipe(boundWith, R.flip(R.reduce)({}));
